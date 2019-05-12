const fetchImages = () =>
  fetch("https://api.instagram.com/v1/users/self/media/recent/?access_token=7523145872.04f1795.bb3e907764c845e398ccf28749e1c9aa")
    .then(res => res.json())
    .then(json => json.data.map((it: any) => ({ url: it.images.standard_resolution.url, createdAt: new Date(it.created_time * 1000), caption: it.caption.text })));

const fetchImage = (url: string) => new Promise((resolve) => {
  const img = document.createElement("img");
  img.onload = resolve;
  img.src = url;

});

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

(async function main() {
  const images = await fetchImages();

  const containers = document.querySelectorAll(".container");

  const shown: number[] = [];

  async function loadImage(index: number) {
    const container = containers[index];

    const img: HTMLImageElement = container.querySelector(".img");

    let imgIndex: number;

    do {
      imgIndex = Math.floor(images.length * Math.random())
    } while(shown.indexOf(imgIndex) !== -1)

    shown[index] = imgIndex;

    const { url, createdAt, caption } = images[imgIndex];

    await fetchImage(url);

    img.style.opacity = "0";
    await sleep(1000);

    img.src = url;
    img.style.opacity = "1";

  }

  for(let i = 0; i < 6; i++)
    await loadImage(i);

  (document.querySelector("#loading") as HTMLElement).style.display = "none";

  while(true) {
    await loadImage(Math.floor(containers.length * Math.random()))
    await sleep(10 * 1000);
  }
})();
