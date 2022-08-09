module.exports = class Input {
    constructor() {
        this.keys = new Map();
        window.addEventListener("keyup", (e) => {
            this.keys.set(e.key, 1);
        });
        window.addEventListener("keydown", (e) => {
            if (this.keys.get(e.key) !== 2) {
                this.keys.set(e.key, 3);
            }
        });
    }

    getKeyUp(key) {
        return this.keys.get(key) === 1;
    }

    getKeyDown(key) {
        return this.keys.get(key) === 3;
    }

    getKey(key) {
        return this.keys.get(key) === 3 || this.keys.get(key) === 2;
    }

    getAxis(negKey, posKey) {
        return (this.getKey(posKey) ? 1 : 0) - (this.getKey(negKey) ? 1 : 0);
    }

    resetKeys() {
        this.keys.forEach((value, key, map) => {
            switch (value) {
                case 1:
                    map.set(key, 0);
                    break;
                case 3:
                    map.set(key, 2);
                    break;
                default:
                    break;
            }
        });
    }
}