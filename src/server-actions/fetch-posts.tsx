"use server";

export async function fetchPosts(page: number) {
  const perPage = 5;
  const apiUrl = `/api/post/list?page=${page}&per_page=${perPage}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
