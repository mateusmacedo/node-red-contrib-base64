module.exports = function(RED) {
    "use strict";
    function Base64Node(config) {
        RED.nodes.createNode(this, config);
        this.action = config.action || "";
        this.property = config.property || "payload";
        const node = this;
        const base64Regex = /^[A-Za-z0-9+/=]*$/;

        // Função para manipular a mensagem de acordo com a ação especificada
        this.on("input", function(msg) {
            try {
                const value = RED.util.getMessageProperty(msg, node.property);

                if (value === undefined) {
                    node.warn("Property not found in message.");
                    return;
                }

                let result;
                switch (node.action) {
                    case "str":
                        result = encodeToBase64(value);
                        break;
                    case "b64":
                        result = decodeFromBase64(value);
                        break;
                    default:
                        result = autoEncodeDecode(value);
                }

                RED.util.setMessageProperty(msg, node.property, result);
                node.send(msg);

            } catch (error) {
                node.error(error.message, msg);
            }
        });

        // Função para codificar valor para Base64
        function encodeToBase64(input) {
            return RED.util.ensureBuffer(input).toString("base64");
        }

        // Função para decodificar valor de Base64
        function decodeFromBase64(input) {
            if (typeof input !== "string") throw new Error("Input is not a string.");

            const cleanInput = input.replace(/\s+/g, "");
            if (!base64Regex.test(cleanInput) || cleanInput.length % 4 !== 0) {
                throw new Error("Invalid Base64 string.");
            }
            return Buffer.from(cleanInput, "base64").toString("binary");
        }

        // Função para determinar automaticamente se deve codificar ou decodificar
        function autoEncodeDecode(input) {
            if (Buffer.isBuffer(input)) {
                return input.toString("base64");
            } else if (typeof input === "string") {
                const cleanInput = input.replace(/\s+/g, "");
                if (base64Regex.test(cleanInput) && cleanInput.length % 4 === 0) {
                    return Buffer.from(cleanInput, "base64");
                } else {
                    return encodeToBase64(input);
                }
            } else {
                throw new Error("Input type not supported for Base64 conversion.");
            }
        }
    }

    RED.nodes.registerType("base64", Base64Node);
};
