export const waitFor = async (seconds: number) =>
  new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(seconds);
    }, seconds * 1000);
  });
