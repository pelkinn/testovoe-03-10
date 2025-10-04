import type { Response } from '@/types/common';

export const useServices = () => {
  const sendForm = (body: string, amount: number) => {
    return new Promise<Response>((resolve, reject) => {
      setTimeout(() => {
        if (amount % 2 === 0) {
          localStorage.setItem('form', body);
          resolve({ success: true });
        } else {
          reject({ success: false });
        }
      }, 1000);
    });
  };

  return {
    sendForm
  };
};
