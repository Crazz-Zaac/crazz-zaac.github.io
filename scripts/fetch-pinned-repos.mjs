#!/usr/bin/env node

/**
 * Fetches pinned repositories from GitHub GraphQL API
 * and writes them to public/pinned-repos.json for static serving.
 *
 * Requires ACCESS_TOKEN environment variable.
 * Run during CI/CD build step.
 */

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql"
const GITHUB_USERNAME = "Crazz-Zaac"

const query = `
{
  user(login: "${GITHUB_USERNAME}") {
    pinnedItems(first: 6, types: REPOSITORY) {
      nodes {
        ... on Repository {
          name
          description
          url
          homepageUrl
          stargazerCount
          forkCount
          primaryLanguage {
            name
            color
          }
          repositoryTopics(first: 10) {
            nodes {
              topic {
                name
              }
            }
          }
        }
      }
    }
  }
}
`

async function main() {
  const token = process.env.ACCESS_TOKEN

  if (!token) {
    console.warn("⚠ ACCESS_TOKEN not set — writing empty pinned repos array")
    const { writeFileSync } = await import("fs")
    writeFileSync("public/pinned-repos.json", "[]")
    return
  }

  try {
    const res = await fetch(GITHUB_GRAPHQL_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })

    if (!res.ok) {
      throw new Error(`GitHub API responded with ${res.status}: ${await res.text()}`)
    }

    const data = await res.json()

    if (data.errors) {
      throw new Error(data.errors[0].message)
    }

    const pinnedRepos = data.data.user.pinnedItems.nodes.map((repo) => ({
      name: repo.name,
      description: repo.description,
      url: repo.url,
      homepageUrl: repo.homepageUrl,
      stars: repo.stargazerCount,
      forks: repo.forkCount,
      language: repo.primaryLanguage,
      topics: repo.repositoryTopics.nodes.map((t) => t.topic.name),
    }))

    const { writeFileSync } = await import("fs")
    writeFileSync("public/pinned-repos.json", JSON.stringify(pinnedRepos, null, 2))
    console.log(`✓ Wrote ${pinnedRepos.length} pinned repos to public/pinned-repos.json`)
  } catch (error) {
    console.error("✗ Failed to fetch pinned repos:", error.message)
    const { writeFileSync } = await import("fs")
    writeFileSync("public/pinned-repos.json", "[]")
    console.warn("⚠ Wrote empty array as fallback")
  }
}

main()
