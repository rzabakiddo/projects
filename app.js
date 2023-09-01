onload = () => {
    builder.parseAndBuild(projects);
    setTimeout(() => {
        document.getElementById("root").style.transform = 'scaleX(0) rotate(2deg)'
        setTimeout(() => {
            document.getElementById("load").remove();
        }, 500)
    }, 2500)
}

const builder = {
    makeDiv: (data) => {
        const project = document.createElement("div");
        const title = document.createElement("p");
        const short = document.createElement("p");
        project.className = 'project';
        title.className = 'title';
        short.className = 'short';
        title.innerText = data.title;
        short.innerText = data.short;
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
        if (data.open) {
            project.style.cursor = 'pointer';
            project.setAttribute('onclick',`window.open('${data.open}')`)
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
        open: 'https://github.com/rzabakiddo/playerdeath-core/tree/master'
    },
    {
        title: 'Web-based CPU test',
        short: 'A simple CPU benchmark, allows you to check the CPU score of a particular browser. Useful for choosing the most optimal.',
        info: [
            {
                content: 'Browser',
                color: '#60ad00'
            },
        ],
        open: 'https://github.com/rzabakiddo/cpu/'
    },
    {
        title: 'RBug',
        short: 'Method debugger (Java), allows to modify returned values in real time. Supports scripting language for automation',
        info: [
            {
                content: 'Currently private',
                color: '#ff0000'
            }
        ]
    },
]