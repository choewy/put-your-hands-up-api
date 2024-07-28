export const EsmPlusTimer = (seconds: number) =>
  new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(seconds - 1);
    }, 1_000);
  });
