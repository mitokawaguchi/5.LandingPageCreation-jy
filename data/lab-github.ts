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
};

export const LAB_REPOS: LabRepoRecord[] = [
  {
    id: 'landing',
    name: '5.LandingPageCreation-jy',
    htmlUrl: 'https://github.com/mitokawaguchi/5.LandingPageCreation-jy',
    homepage: 'https://v0-mit-tech-studio.vercel.app',
    language: 'TypeScript',
    commitsCount: 19,
  },
  {
    id: 'taskflow',
    name: 'taskflow',
    htmlUrl: 'https://github.com/mitokawaguchi/taskflow',
    homepage: 'https://taskflow-alpha-ebon.vercel.app',
    language: 'JavaScript',
    commitsCount: 136,
  },
  {
    id: 'profileReadme',
    name: 'mitokawaguchi',
    htmlUrl: 'https://github.com/mitokawaguchi/mitokawaguchi',
    homepage: null,
    language: null,
    commitsCount: 6,
  },
];
