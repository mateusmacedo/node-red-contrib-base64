# Base64 Node for Node-RED

A Node-RED node that encodes or decodes data between Base64 and binary formats. This node is useful for applications where data needs to be transformed into a Base64-encoded string or decoded back into binary format.

## Installation

To install this node, place the file in your Node-RED nodes directory and restart Node-RED.

```bash
cd ~/.node-red
npm install @ether/node-red-contrib-base64
```

After installation, the node will be available in the **Parser** category in the Node-RED editor.

## Node Properties

- **Name**: *(optional)* Sets the display name for the node.
- **Action**:
  - `Convert Buffer <-> Base64`: Automatically detects the input type and encodes or decodes as necessary.
  - `Encode as Base64`: Forces the node to encode the input to a Base64 string.
  - `Convert Base64 to String`: Forces the node to decode a Base64 string back into a binary buffer.
- **Property**: *(default: `msg.payload`)* The message property to encode or decode. This is typically `msg.payload`, but can be set to any other message property.

## Functionality

This node operates based on the selected action:

1. **Convert Buffer <-> Base64**: Automatically encodes a binary buffer to Base64 or decodes a Base64 string back to binary, depending on the input type.
2. **Encode as Base64**: Encodes the specified message property to a Base64 string.
3. **Convert Base64 to String**: Decodes the specified message property from a Base64 string to binary.

## Example

### Encoding to Base64

To encode a text string into Base64, set `msg.payload` to the text string and configure the **Action** to `Encode as Base64`. The output in `msg.payload` will be the Base64-encoded string.

### Decoding from Base64

To decode a Base64 string back to binary, set `msg.payload` to the Base64 string and configure the **Action** to `Convert Base64 to String`. The output in `msg.payload` will be a binary buffer.

## Error Handling

This node provides error handling for common issues:

- **Invalid Base64 Input**: If the input is not a valid Base64 string, an error will be logged.
- **Unsupported Input Type**: If the input type is not a string or buffer, a warning will be generated.

## Notes

- Using **Encode as Base64** on an already Base64-encoded string will result in double encoding.
- Ensure that the input property specified in **Property** exists in the message; otherwise, a warning will be generated.

## License

MIT License
