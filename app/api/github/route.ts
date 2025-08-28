import { Octokit } from "octokit";
import { NextResponse, NextRequest } from "next/server";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

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

  if (!username) {
    return NextResponse.json(
      { error: "Username is Required" },
      { status: 401 }
    );
  }

  try {
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
    return NextResponse.json(
      { error: "Failed to fetch github Data" },
      { status: 500 }
    );
  }
}
