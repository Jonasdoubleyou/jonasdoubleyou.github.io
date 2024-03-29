/* self written modern and sloppy JS. Feel free to read */


const question = document.querySelector("#question"),
    suggestion = document.querySelector("#suggestion"),
    headline = document.querySelector("#headline"),
    content = document.querySelector("#content"),
    answer = document.querySelector("#answer");

const random = arr => arr[Math.floor(Math.random() * arr.length)];

let cancelSetContent = () => {};

const startContent = {
    headline: "Hi, I'm Jonas!",
    content: `What do you want to know about me?<br />I mean ...there must be a reason why you are here ...<br /><br /><a href="#V2hhdCdzIHlvdXIgZW1haWw/">email</a>. <a href="#RG8geW91IGJsb2c/" >blog</a>.`,
    search: [],
};

let currentContent = startContent;

function setContent(c) {
    currentContent = c;
    const {
        headline: headlineText,
        content: contentText
    } = currentContent;

    cancelSetContent();

    const proceed = (function* () {
        headline.style.paddingTop = "0px";
        content.style.paddingTop = "0px";

        headline.style.opacity = 0;
        content.style.opacity = 0;

        yield;

        headline.innerHTML = headlineText;
        content.innerHTML = contentText;

        headline.style.paddingTop = "40px";
        content.style.paddingTop = "40px";

        answer.style.color = random(["lightcoral", "lightblue", "lightseagreen"]);

        yield;

        headline.style.paddingTop = "20px";
        content.style.paddingTop = "20px";

        headline.style.opacity = 1;
        content.style.opacity = 1;

    })();

    let timer = setInterval(() => proceed.next(), 500);

    cancelSetContent = () => clearInterval(timer);
}

const goto = page => `<a href="#${btoa(page)}">${page}</a>`;


const contents = [{
        search: ["age", "old"],
        headline: `I'm ${Math.floor((Date.now() - 969487200000) / (1000 * 60 * 60 * 24 * 365))}.`,
        content: "",
    },
    {
        search: ["name", "lastname"],
        headline: `My name is Jonas Wilms.`,
        content: `also: Jonas, Wilms, the_wilmsinator, jonasdoubleyou`
    },
    {
        search: ["company", "work", "job"],
        headline: `<a href="https://sap.com">SAP</a>.`,
        content: "",
    },
    {
        search: ["email"],
        headline: (mail => `<a href="mailto:${mail}">${mail}</a>`)(`ajnin.smliw@sanoj`.split ``.reverse().join ``),
        content: "Please only reach out to me if you really need to.<br/> In case you came here from StackOverflow, please use comments to contact me about answers",
    },
    {
        search: ["stackoverflow"],
        headline: "I participate on StackOverflow.",
        content: `You can find me <a href="https://stackoverflow.com/users/5260024/jonas-wilms">there</a>.<br/>I'm there to help.`,
    },
    {
        search: ["instagram", "social", "media", "photography", "photos", "fotos"],
        headline: "I sometimes make photos.",
        content: `You can find some on <a href="https://instagram.com/the_wilmsinator">Instagram</a>.`,
    },
    {
        search: ["study", "university"],
        headline: `I study Software Engineering`,
        content: `at <a href="https://karlsruhe.dhbw.de">DHBW Karlsruhe</a>.`,
    },
    {
        search: ["school"],
        headline: `<a href="https://vlg-stade.de">VLG Stade</a>.`,
        content: "I finished school in summer 19'."
    },
    {
        search: ["live"],
        headline: "I currently live in Karlsruhe, Germany.",
        content: "In case you are passing by, feel free to visit me :)",
    },
    {
        search: ["from"],
        headline: "I'm from Stade, Niedersachsen, Germany.",
        content: "That's the reason why I sometimes greet other people with <i>Moin, Moin!</i>",
    },
    {
        search: ["blog"],
        headline: `blog`,
        content: "<a href='/blog/wide-area.html'>Wide Area AirPrint - Printing on remote printers on iOS</a>",
    }
];

const noContentFound = debounce(() => {
    setContent({
        headline: "I'm sorry. I don't know the answer.",
        content: "Probably it's time to search for it ..."
    });
}, 3000);

function chooseContent(search) {
    if (!search.trim()) {
        setContent(startContent);
        return;
    }
    const words = search.toLowerCase().replace(/\?/g, "").split(" ");

    const matches = contents.filter(it => words.some(word => it.search.includes(word)));

    if (matches.length !== 1) {
        noContentFound();
        return;
    }

    const match = matches[0];

    if (match === currentContent)
        return;

    noContentFound.cancel();

    setContent(match);

}

function debounce(fn, time = 1000) {
    let timer;
    return Object.assign(
        function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), time);
        }, {
            cancel() {
                clearTimeout(timer);
            }
        }
    );

}


question.addEventListener("input", debounce(() => chooseContent(question.value)));

function fromHash() {
    const start = window.location.hash.slice(1);

    if (start) {
        question.value = atob(start);
        chooseContent(atob(start));
    } else {
        question.value = "";
        setContent(startContent);
    }
}

fromHash();
window.addEventListener("hashchange", fromHash);

const suggestions = [
    "What's your age?",
    "What's your lastname?",
    "Where do you work?",
    "What's your job?",
    "What's your email?",
    "You make photos, right?",
    "What do you study?",
    "Where do you study?",
    "Which school have you been at?",
    "You are on Stackoverflow, right?",
    "Why do you participate on Stackoverflow?",
    "Where are you from?",
    "Where do you live?"
];

setInterval(() => {
    const suggestion = random(suggestions);
    question.placeholder = suggestion;
}, 2000);

question.focus();