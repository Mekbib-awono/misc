class Observable {
    addObserver() {

    }

    removeObserver() {

    }

    notifyObserver() {

    }
}

class Observer {
    update() {

    }
}

class WeatherStation extends Observable {
    constructor() {
        super();
        this.observers = [];
        this.temp = 0;
    }

    addObserver(o) {
        this.observers.push(o);
    }

    removeObserver(o) {
        const index = o.index;
        this.observers.splice(index, 1);
    }

    async notifyObserver(temp) {
        const mappedPromises = this.observers.map(async o => {
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    o.update(temp)
                    resolve();
                },  2000);
            });
        });

        return await Promise.all(mappedPromises);
    };
}

class AC extends Observer {
    update(temp) {
        if (temp < 20) {
            console.log("too cold. turn heater on.");
        } else if (temp > 25)  {
            console.log("too hot. turn AC");
        } else {
            console.log("room temp just alright");
        }
    }
}

class Display extends Observer {
    update(temp) {
        console.log(`updating display: ${temp}`)
    }
}

const run = async (temp) => {
    const ws = new WeatherStation();
    const display = new Display();
    const ac = new AC();

    ws.addObserver(display);
    ws.addObserver(ac);

    await ws.notifyObserver(19);
    console.log("................");

    await ws.notifyObserver(21);
    console.log("................");

    await ws.notifyObserver(27);
    console.log("................");
}

run();
