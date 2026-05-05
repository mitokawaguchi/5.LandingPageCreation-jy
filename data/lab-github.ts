/**
 * GitHub 公開 API に基づくリポジトリ情報（更新日: 2026-03-25 時点）。
 * リポジトリが増えたらこのファイルと messages の lab.repos を更新してください。
 */
export type LabRepoId = 'landing' | 'taskflow' | 'profileReadme';

export type LabRepoRecord = {
  id: LabRepoId;
  name: string;
  htmlUrl: string;
  homepage: string | null;
  language: string | null;
  commitsCount: number;
  imageUrl: string;
};

export const LAB_GITHUB_PROFILE = {
  login: 'mitokawaguchi',
  displayName: 'Mito',
  avatarUrl: 'https://avatars.githubusercontent.com/u/143634747?v=4',
  profileUrl: 'https://github.com/mitokawaguchi',
  statsCardUrl:
    'https://github-readme-stats.vercel.app/api?username=mitokawaguchi&show_icons=true&theme=transparent&hide_border=true&title_color=356A7C&text_color=94A3B8&icon_color=5BA3B8',
  languagesCardUrl:
    'https://github-readme-stats.vercel.app/api/top-langs/?username=mitokawaguchi&layout=compact&theme=transparent&hide_border=true&title_color=356A7C&text_color=94A3B8',
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
    commitsCount: 19,
    imageUrl: '/icon.svg',
  },
  {
    id: 'taskflow',
    name: 'taskflow',
    htmlUrl: 'https://github.com/mitokawaguchi/taskflow',
    homepage: 'https://taskflow-alpha-ebon.vercel.app',
    language: 'JavaScript',
    commitsCount: 136,
    imageUrl: 'https://opengraph.githubassets.com/mit-tech-studio/mitokawaguchi/taskflow',
  },
  {
    id: 'profileReadme',
    name: 'mitokawaguchi',
    htmlUrl: 'https://github.com/mitokawaguchi/mitokawaguchi',
    homepage: null,
    language: null,
    commitsCount: 6,
    imageUrl: 'https://opengraph.githubassets.com/mit-tech-studio/mitokawaguchi/mitokawaguchi',
  },
];
