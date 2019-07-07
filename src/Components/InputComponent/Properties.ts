interface Properties {

    name: string;
    text: string;

    value: string;
    onChange?: (name: string, value: string) => void;
}

export default Properties;