import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: "public_ph8MN/8Xagt+6iR7gKkBVy0LeYQ=",
  privateKey: "private_2qlowJNlYsiEZSWO+DF2w4JaEVM=",
  urlEndpoint: "https://ik.imagekit.io/agnes",
});

export const uploadImage = async (file, prefixName = "mylibrary") => {
  const res = await imagekit.upload({
    file: file,
    fileName: prefixName,
    folder: "mylibrary",
  });
  return res.url;
};
