import { PhotoType } from "../types/portfolios";

export const getImage = (photo: PhotoType) => {
  return `https://ap-portfolio-backend.up.railway.app/upload/${photo._id}.${
    photo?.name?.split(".")[1]
  }`;
};

export const getUserImage = (id: string) => {
  return `https://ap-portfolio-backend.up.railway.app/upload/${id}
`;
};
