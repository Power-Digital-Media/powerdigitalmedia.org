# AI Audio Workflow (Phase 1: Local)

This guide explains how to add an AI-generated audio summary to a blog post using Google NotebookLM.

## 1. Generate Audio
1.  Go to **[NotebookLM](https://notebooklm.google.com/)**.
2.  Create a new notebook.
3.  Paste the full text of your blog post as a source.
4.  Click **"Generate Audio Overview"** (Deep Dive).
5.  Listen to verify quality.
6.  Download the audio file (MP3).

## 2. Prepare File
1.  Rename the file to match your blog post slug (e.g., `my-post-slug.mp3`).
    - *Example*: `february-2026-studio-tech.mp3`
2.  Move the file to your project folder:
    - Path: `public/audio/`

## 3. Enable Player
1.  Open `src/data/blogPosts.ts`.
2.  Find the post entry.
3.  Add the `audioUrl` property:

```typescript
{
    slug: "my-post-slug",
    title: "My Post Title",
    // ...
    audioUrl: "/audio/my-post-slug.mp3", // Add this line
    // ...
}
```

## 4. Deploy
1.  Commit and push to `master`.
    ```bash
    git add public/audio/ src/data/blogPosts.ts
    git commit -m "feat(content): add audio to [post name]"
    git push origin master
    ```
