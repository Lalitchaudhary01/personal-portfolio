"use client";
import React from "react";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Calendar, GitBranch, GitCommit, Star, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { cn } from "@/lib/utils";

interface Props {
  username: string;
}
interface GithubStats {
  user: {
    totalContribution: number;
  };
  contributions: {
    count: number;
    date: string;
  }[];
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
} as const;

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
} as const;

const numberVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 20,
      delay: 0.3,
    },
  },
} as const;

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 150,
      damping: 12,
    },
  },
} as const;

const pulseAnimation = {
  scale: [...[1, 1.05, 1]],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

const GithubStats = ({ username }: Props) => {
  const [stats, setStats] = useState<GithubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGithubStats = async () => {
      try {
        const response = await fetch(`/api/github?username=${username}`);

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        setStats(data);
        console.log(data);
      } catch (error) {
        setError("failed to fetch github stats");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchGithubStats();
  }, [username]);

  if (loading) {
    return (
      <Card className="p-4 sm:p-6 bg-card border-border/5">
        <motion.div
          className="space-y-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="h-4 bg-muted rounded w-3/4"
            animate={{ width: ["75%", "60%", "75%"] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="h-8 bg-muted rounded"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
          <motion.div
            className="h-32 bg-muted rounded"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: 0.3 }}
          />
        </motion.div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-4 sm:p-6 bg-card border-border/5">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.p
            className="text-destructive"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {error}
          </motion.p>
        </motion.div>
      </Card>
    );
  }

  if (!stats) return null;

  // Calculate current streak
  const currentStreak = stats.contributions
    .slice()
    .reverse()
    .reduce((streak, day, index) => {
      if (index === 0 && day.count === 0) return 0;
      if (day.count > 0) return streak + 1;
      return streak;
    }, 0);

  // Calculate max contributions in a day
  const maxContributions = Math.max(
    ...stats.contributions.map((day) => day.count)
  );

  // Calculate contribution levels
  const getContributionLevel = (count: number) => {
    if (count === 0) return "bg-muted";
    const percentage = (count / maxContributions) * 100;

    if (percentage <= 25) return "bg-primary/30";
    if (percentage <= 50) return "bg-primary/50";
    if (percentage <= 75) return "bg-primary/70";

    return "bg-primary";
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Card className="p-4 sm:p-6 lg:p-8 bg-card border-border/5 backdrop-blur-sm overflow-hidden relative">
        {/* Background gradient animation */}
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, hsl(var(--primary)) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, hsl(var(--primary)) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 50%, hsl(var(--primary)) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          variants={containerVariants}
          className="space-y-6 sm:space-y-8 relative z-10"
        >
          {/* Header */}
          <motion.div
            variants={cardVariants}
            className="flex items-center gap-3"
          >
            <motion.div
              variants={iconVariants}
              className="p-2 rounded-full bg-primary/10"
              whileHover={{ scale: 1.1, rotate: 5 }}
              animate={pulseAnimation}
            >
              <GitCommit className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </motion.div>
            <motion.h3
              className="text-lg sm:text-xl font-semibold"
              variants={cardVariants}
            >
              Contribution Activity
            </motion.h3>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {/* Current Streak */}
            <motion.div
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                y: -5,
                transition: { type: "spring", stiffness: 300 },
              }}
              className="p-4 rounded-lg bg-secondary/50 backdrop-blur-sm relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              <motion.div variants={iconVariants}>
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary mb-2" />
              </motion.div>
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <motion.p
                variants={numberVariants}
                className="text-xl sm:text-2xl font-bold text-primary"
                animate={{
                  scale: currentStreak > 0 ? [1, 1.05, 1] : 1,
                }}
                transition={{
                  duration: 1.5,
                  repeat: currentStreak > 0 ? Infinity : 0,
                  repeatDelay: 3,
                }}
              >
                {currentStreak} days
              </motion.p>
            </motion.div>

            {/* Total Contributions */}
            <motion.div
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                y: -5,
                transition: { type: "spring", stiffness: 300 },
              }}
              className="p-4 rounded-lg bg-secondary/50 backdrop-blur-sm relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              <motion.div variants={iconVariants}>
                <GitBranch className="w-4 h-4 sm:w-5 sm:h-5 text-primary mb-2" />
              </motion.div>
              <p className="text-sm text-muted-foreground">
                Total Contributions
              </p>
              <motion.p
                variants={numberVariants}
                className="text-xl sm:text-2xl font-bold"
                whileHover={{ scale: 1.05 }}
              >
                {stats.user.totalContribution.toLocaleString()}
              </motion.p>
            </motion.div>

            {/* Best Day */}
            <motion.div
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                y: -5,
                transition: { type: "spring", stiffness: 300 },
              }}
              className="p-4 rounded-lg bg-secondary/50 backdrop-blur-sm sm:col-span-2 lg:col-span-1 relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              <motion.div variants={iconVariants}>
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-primary mb-2" />
              </motion.div>
              <p className="text-sm text-muted-foreground">Best Day</p>
              <motion.p
                variants={numberVariants}
                className="text-xl sm:text-2xl font-bold"
                animate={
                  maxContributions > 10
                    ? {
                        textShadow: [
                          "0 0 0px hsl(var(--primary))",
                          "0 0 10px hsl(var(--primary)/0.3)",
                          "0 0 0px hsl(var(--primary))",
                        ],
                      }
                    : {}
                }
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
              >
                {maxContributions} commits
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Contribution Graph */}
          <motion.div variants={cardVariants} className="space-y-4">
            <motion.div
              variants={cardVariants}
              className="flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4 text-primary" />
              <h4 className="text-sm font-medium text-muted-foreground">
                Last 30 days
              </h4>
            </motion.div>

            <div className="overflow-x-auto pb-4">
              <motion.div
                className="grid grid-rows-1 grid-flow-col gap-1 min-w-[600px]"
                variants={containerVariants}
              >
                <TooltipProvider>
                  <AnimatePresence>
                    {stats.contributions.slice(-30).map((day, index) => (
                      <motion.div
                        key={day.date}
                        initial={{
                          scale: 0,
                          opacity: 0,
                          y: 20,
                        }}
                        animate={{
                          scale: 1,
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          scale: 0,
                          opacity: 0,
                          y: -20,
                        }}
                        transition={{
                          delay: index * 0.03,
                          type: "spring",
                          stiffness: 150,
                          damping: 15,
                        }}
                        whileHover={{
                          scale: 1.3,
                          zIndex: 10,
                          transition: { duration: 0.2 },
                        }}
                      >
                        <Tooltip>
                          <TooltipTrigger>
                            <motion.div
                              className={cn(
                                "h-6 w-6 sm:h-8 sm:w-8 rounded-sm cursor-pointer",
                                getContributionLevel(day.count),
                                "transition-all duration-200"
                              )}
                              whileHover={{
                                boxShadow: "0 0 20px hsl(var(--primary)/0.5)",
                              }}
                              animate={
                                day.count > maxContributions * 0.8
                                  ? {
                                      boxShadow: [
                                        "0 0 0px hsl(var(--primary)/0)",
                                        "0 0 10px hsl(var(--primary)/0.3)",
                                        "0 0 0px hsl(var(--primary)/0)",
                                      ],
                                    }
                                  : {}
                              }
                              transition={{
                                boxShadow: {
                                  duration: 2,
                                  repeat: Infinity,
                                  repeatDelay: 3,
                                },
                              }}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <motion.p
                              className="text-xs font-semibold text-black"
                              initial={{ scale: 0.8 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 200 }}
                            >
                              {day.count} contributions on{" "}
                              {new Date(day.date).toLocaleDateString(
                                undefined,
                                {
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </motion.p>
                          </TooltipContent>
                        </Tooltip>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </TooltipProvider>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default GithubStats;
