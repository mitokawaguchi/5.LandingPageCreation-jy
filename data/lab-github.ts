/**
 * GitHub 公開 API に基づくプロフィール・リポジトリ情報（更新日: 2026-03-25 時点）。
 * リポジトリが増えたらこのファイルと messages の lab.repos を更新してください。
 */
export type LabRepoId = 'landing' | 'taskflow' | 'profileReadme';

export type LabRepoRecord = {
  id: LabRepoId;
  name: string;
  htmlUrl: string;
  homepage: string | null;
  language: string | null;
  openIssues?: number;
};

export const LAB_GITHUB_PROFILE = {
  login: 'mitokawaguchi',
  displayName: 'Mito',
  avatarUrl: 'https://avatars.githubusercontent.com/u/143634747?v=4',
  profileUrl: 'https://github.com/mitokawaguchi',
  publicRepos: 3,
  followers: 1,
  following: 1,
} as const;

export const LAB_REPOS: LabRepoRecord[] = [
  {
    id: 'landing',
    name: '5.LandingPageCreation-jy',
    htmlUrl: 'https://github.com/mitokawaguchi/5.LandingPageCreation-jy',
    homepage: 'https://v0-mit-tech-studio.vercel.app',
    language: 'TypeScript',
  },
  {
    id: 'taskflow',
    name: 'taskflow',
    htmlUrl: 'https://github.com/mitokawaguchi/taskflow',
    homepage: 'https://taskflow-alpha-ebon.vercel.app',
    language: 'JavaScript',
    openIssues: 5,
  },
  {
    id: 'profileReadme',
    name: 'mitokawaguchi',
    htmlUrl: 'https://github.com/mitokawaguchi/mitokawaguchi',
    homepage: null,
    language: null,
  },
];
