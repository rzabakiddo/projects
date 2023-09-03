onload = () => {
    builder.parseAndBuild(projects);
    setTimeout(() => {
        document.getElementById("root").style.transform = 'scaleX(0) rotate(2deg)'
        setTimeout(() => {
            document.getElementById("load").remove();
        }, 500)
    }, 2500)
}

const ezTyper = (text, duration) => {
    const promises = [];
    const seed = Math.random().toString(16);
    for (let i = 0; i < text.length; i++) {
        promises.push(new Promise(res => {
            setTimeout(() => {
                res([text[i],seed]);
            }, (duration / text.length) * i)
        }))
    }
    return [promises, seed];
}

const safeMap = new Map();
const type = (element, typer) => {
    safeMap.set(element,typer[1])
    for (let promise of typer[0]) {
        promise.then((data) => {
            if(safeMap.get(element) == typer[1])
                element.textContent = element.textContent + decodeURI(data[0]);
        })
    }
}
const changeLang = (id) => {
    lang.current = id;
    for (let project of document.getElementById("projects").children) {
        const short = project.children[2]
        const title = project.children[1]
        short.textContent = '';
        title.textContent = '';
        const language = lang.langs[lang.current][project.getAttribute('projid')];
        type(short,ezTyper(language.short,1000))
        type(title,ezTyper(language.title,500))
        project.style.height = lang.current == 'en' ? '4em' : '4.5em';
    }
}
const builder = {
    makeDiv: (proj) => {
        const project = document.createElement("div");
        const data = lang.langs[lang.current][proj.id];
        const title = document.createElement("p");
        const short = document.createElement("p");
        project.setAttribute("projid",proj.id);
        project.className = 'project';
        title.className = 'title';
        short.className = 'short';
        short.innerText = data.short;
        title.innerText = data.title;
        if (data.info) {
            const info = document.createElement("div");
            info.className = 'info';
            for (let badge of data.info) {
                const sub = document.createElement("div");
                sub.className = 'badge';
                sub.style.background = badge.color;
                sub.innerText = badge.content;
                info.appendChild(sub);
            }
            project.appendChild(info);
        }
        project.append(title, short)
        if (proj.open) {
            project.style.cursor = 'pointer';
            project.setAttribute('onclick', `window.open('${proj.open}')`)
        }
        return project;
    },
    parseAndBuild: (data) => {
        for (let project of data) {
            document.getElementById("projects").appendChild(builder.makeDiv(project));
        }
    }
}

const projects = [
    {
        id: 'cdp',
        open: 'https://github.com/rzabakiddo/playerdeath-core/tree/master'
    },
    {
        id: 'wbc',
        open: 'https://github.com/rzabakiddo/cpu/'
    },
    {
        id: 'rtd'
    },
]

const lang = {
    current: 'en',
    langs: {
        pl: {
            rtd: {
                title: 'RBug',
                short: 'Debugger metod (Java), pozwala na zmiane zwracanych wartosci w czasie rzeczywistym. Wspiera jezyk skryptowy do automatyzacji.',
                info: [
                    {
                        content: 'Aktualnie prywatne',
                        color: '#ff0000'
                    }
                ]
            },
            wbc: {
                title: 'Webowy test CPU',
                short: 'Prosty benchmark CPU, pozwala sprawdzic wynik procesora na poszczegolnych przegladarkach, przydatne do wyboru najbardziej optymalnej.',
                info: [
                    {
                        content: 'Przegladarka',
                        color: '#60ad00'
                    },
                ],
            },
            cdp: {
                title: 'Niestandardowe smierci',
                short: 'Plugin dodajacy nowy system smierci w grze minecraft, gdy umrzesz mozesz zostac ozywiony przez druga osobe',
                info: [
                    {
                        content: '1.19',
                        color: '#ff9900'
                    },
                    {
                        content: 'Spigot',
                        color: '#0080dd'
                    }
                ],
            }
        },
        en: {
            rtd: {
                title: 'RBug',
                short: 'Method debugger (Java), allows to modify returned values in real time. Supports scripting language for automation',
                info: [
                    {
                        content: 'Currently private',
                        color: '#ff0000'
                    }
                ]
            },
            wbc: {
                title: 'Web-based CPU test',
                short: 'A simple CPU benchmark, allows you to check the CPU score of a particular browser. Useful for choosing the most optimal.',
                info: [
                    {
                        content: 'Browser',
                        color: '#60ad00'
                    },
                ],
            },
            cdp: {

                title: 'Custom death plugin',
                short: 'A plugin that adds a different death system in minecraft, when you die you can be revived by other player.',
                info: [
                    {
                        content: '1.19',
                        color: '#ff9900'
                    },
                    {
                        content: 'Spigot',
                        color: '#0080dd'
                    }
                ],
            }
        }
    }
}