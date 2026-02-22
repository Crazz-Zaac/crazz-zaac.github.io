import { NextResponse } from "next/server"

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

export async function GET() {
  const token = process.env.ACCESS_TOKEN

  if (!token) {
    return NextResponse.json(
      { error: "ACCESS_TOKEN not configured" },
      { status: 500 }
    )
  }

  try {
    const res = await fetch(GITHUB_GRAPHQL_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 }, // cache for 1 hour
    })

    if (!res.ok) {
      throw new Error(`GitHub API responded with ${res.status}`)
    }

    const data = await res.json()

    if (data.errors) {
      throw new Error(data.errors[0].message)
    }

    const pinnedRepos = data.data.user.pinnedItems.nodes.map(
      (repo: {
        name: string
        description: string | null
        url: string
        homepageUrl: string | null
        stargazerCount: number
        forkCount: number
        primaryLanguage: { name: string; color: string } | null
        repositoryTopics: { nodes: { topic: { name: string } }[] }
      }) => ({
        name: repo.name,
        description: repo.description,
        url: repo.url,
        homepageUrl: repo.homepageUrl,
        stars: repo.stargazerCount,
        forks: repo.forkCount,
        language: repo.primaryLanguage,
        topics: repo.repositoryTopics.nodes.map(
          (t: { topic: { name: string } }) => t.topic.name
        ),
      })
    )

    return NextResponse.json(pinnedRepos)
  } catch (error) {
    console.error("Failed to fetch pinned repos:", error)
    return NextResponse.json(
      { error: "Failed to fetch pinned repositories" },
      { status: 500 }
    )
  }
}
