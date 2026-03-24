import { Octokit } from "octokit";
import { NextResponse, NextRequest } from "next/server";

// TypeScript interface for the GraphQL response
interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

interface GithubResponse {
  user: {
    contributionsCollection: {
      contributionCalendar: ContributionCalendar;
    };
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const token = process.env.GITHUB_TOKEN;

  if (!username) {
    return NextResponse.json(
      { error: "Username is Required" },
      { status: 401 }
    );
  }

  if (!token) {
    return NextResponse.json(
      {
        error:
          "GitHub token missing. Add GITHUB_TOKEN to .env.local to load activity.",
      },
      { status: 503 }
    );
  }

  try {
    const octokit = new Octokit({
      auth: token,
    });

    const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `;

    // Tell TypeScript what response shape to expect
    const response = await octokit.graphql<GithubResponse>(query, { username });

    const calendar = response.user.contributionsCollection.contributionCalendar;

    // Flatten the weeks array to get all contribution days
    const contributions = calendar.weeks.flatMap((week) =>
      week.contributionDays.map((day) => ({
        count: day.contributionCount,
        date: day.date,
      }))
    );

    return NextResponse.json({
      user: {
        totalContribution: calendar.totalContributions,
      },
      contributions,
    });
  } catch (error) {
    console.error("GITHUB API ERROR", error);

    const message =
      error instanceof Error
        ? error.message
        : "Failed to fetch github Data";

    const isRateLimited =
      message.toLowerCase().includes("quota") ||
      message.toLowerCase().includes("rate limit");

    return NextResponse.json(
      {
        error: isRateLimited
          ? "GitHub API rate limit exhausted. Try again later or use a fresh GITHUB_TOKEN."
          : "Failed to fetch github data.",
      },
      { status: isRateLimited ? 429 : 500 }
    );
  }
}
