[fluree-simple-keyring - v0.1.0](../README.md) > [SimpleKeyring](../classes/simplekeyring.md)

# Class: SimpleKeyring

## Hierarchy

`EventEmitter`

**↳ SimpleKeyring**

## Index

### Constructors

- [constructor](simplekeyring.md#constructor)

### Properties

- [type](simplekeyring.md#type)
- [wallets](simplekeyring.md#wallets)
- [defaultMaxListeners](simplekeyring.md#defaultmaxlisteners)
- [type](simplekeyring.md#type-1)

### Methods

- [addAccounts](simplekeyring.md#addaccounts)
- [addListener](simplekeyring.md#addlistener)
- [deserialize](simplekeyring.md#deserialize)
- [emit](simplekeyring.md#emit)
- [eventNames](simplekeyring.md#eventnames)
- [exportAccount](simplekeyring.md#exportaccount)
- [getAccounts](simplekeyring.md#getaccounts)
- [getAppKeyAuthID](simplekeyring.md#getappkeyauthid)
- [getMaxListeners](simplekeyring.md#getmaxlisteners)
- [getPrivateKeyFor](simplekeyring.md#getprivatekeyfor)
- [getWalletForAccount](simplekeyring.md#getwalletforaccount)
- [listenerCount](simplekeyring.md#listenercount)
- [listeners](simplekeyring.md#listeners)
- [off](simplekeyring.md#off)
- [on](simplekeyring.md#on)
- [once](simplekeyring.md#once)
- [prependListener](simplekeyring.md#prependlistener)
- [prependOnceListener](simplekeyring.md#prependoncelistener)
- [rawListeners](simplekeyring.md#rawlisteners)
- [removeAccount](simplekeyring.md#removeaccount)
- [removeAllListeners](simplekeyring.md#removealllisteners)
- [removeListener](simplekeyring.md#removelistener)
- [serialize](simplekeyring.md#serialize)
- [setMaxListeners](simplekeyring.md#setmaxlisteners)
- [signQuery](simplekeyring.md#signquery)
- [signRequest](simplekeyring.md#signrequest)
- [signTransaction](simplekeyring.md#signtransaction)
- [listenerCount](simplekeyring.md#listenercount-1)

---

## Constructors

<a id="constructor"></a>

### constructor

⊕ **new SimpleKeyring**(opts: _`any`_): [SimpleKeyring](simplekeyring.md)

_Defined in [src/index.ts:13](https://github.com/StylusFrost/fluree-simple-keyring/blob/2ebbdeb/src/index.ts#L13)_

**Parameters:**

| Name            | Type  |
| --------------- | ----- |
| `Optional` opts | `any` |

**Returns:** [SimpleKeyring](simplekeyring.md)

---

## Properties

<a id="type"></a>

### type

**● type**: _`string`_ = SimpleKeyring.type

_Defined in [src/index.ts:12](https://github.com/StylusFrost/fluree-simple-keyring/blob/2ebbdeb/src/index.ts#L12)_

---

<a id="wallets"></a>

### wallets

**● wallets**: _`Array`<`Wallet`>_ = []

_Defined in [src/index.ts:13](https://github.com/StylusFrost/fluree-simple-keyring/blob/2ebbdeb/src/index.ts#L13)_

---

<a id="defaultmaxlisteners"></a>

### `<Static>` defaultMaxListeners

**● defaultMaxListeners**: _`number`_

_Inherited from EventEmitter.defaultMaxListeners_

_Defined in node_modules/@types/node/events.d.ts:30_

---

<a id="type-1"></a>

### `<Static>` type

**● type**: _`string`_ = "Simple Key Pair"

_Defined in [src/index.ts:11](https://github.com/StylusFrost/fluree-simple-keyring/blob/2ebbdeb/src/index.ts#L11)_

---

## Methods

<a id="addaccounts"></a>

### addAccounts

▸ **addAccounts**(n?: _`number` \| `undefined`_): `Promise`<`Array`<`Buffer`>>

_Defined in [src/index.ts:112](https://github.com/StylusFrost/fluree-simple-keyring/blob/2ebbdeb/src/index.ts#L112)_

**Parameters:**

| Name              | Type                    | Default value |
| ----------------- | ----------------------- | ------------- |
| `Default value` n | `number` \| `undefined` | 1             |

**Returns:** `Promise`<`Array`<`Buffer`>>

---

<a id="addlistener"></a>

### addListener

▸ **addListener**(event: _`string` \| `symbol`_, listener: _`function`_): `this`

_Inherited from EventEmitter.addListener_

_Overrides EventEmitter.addListener_

_Defined in node_modules/@types/node/events.d.ts:32_

**Parameters:**

| Name     | Type                 |
| -------- | -------------------- |
| event    | `string` \| `symbol` |
| listener | `function`           |

**Returns:** `this`

---

<a id="deserialize"></a>

### deserialize

▸ **deserialize**(privateKeys?: _`Array`<`Buffer`>_): `Promise`<`unknown`>

_Defined in [src/index.ts:95](https://github.com/StylusFrost/fluree-simple-keyring/blob/2ebbdeb/src/index.ts#L95)_

**Parameters:**

| Name                        | Type              | Default value |
| --------------------------- | ----------------- | ------------- |
| `Default value` privateKeys | `Array`<`Buffer`> | []            |

**Returns:** `Promise`<`unknown`>

---

<a id="emit"></a>

### emit

▸ **emit**(event: _`string` \| `symbol`_, args: _`any`[]_): `boolean`

_Inherited from EventEmitter.emit_

_Overrides EventEmitter.emit_

_Defined in node_modules/@types/node/events.d.ts:44_

**Parameters:**

| Name        | Type                 |
| ----------- | -------------------- |
| event       | `string` \| `symbol` |
| `Rest` args | `any`[]              |

**Returns:** `boolean`

---

<a id="eventnames"></a>

### eventNames

▸ **eventNames**(): `Array`<`string` \| `symbol`>

_Inherited from EventEmitter.eventNames_

_Overrides EventEmitter.eventNames_

_Defined in node_modules/@types/node/events.d.ts:45_

**Returns:** `Array`<`string` \| `symbol`>

---

<a id="exportaccount"></a>

### exportAccount

▸ **exportAccount**(authID: _`Buffer`_, opts?: _`object`_): `Promise`<`Buffer`>

_Defined in [src/index.ts:132](https://github.com/StylusFrost/fluree-simple-keyring/blob/2ebbdeb/src/index.ts#L132)_

**Parameters:**

| Name                 | Type     | Default value |
| -------------------- | -------- | ------------- |
| authID               | `Buffer` | -             |
| `Default value` opts | `object` | {}            |

**Returns:** `Promise`<`Buffer`>

---

<a id="getaccounts"></a>

### getAccounts

▸ **getAccounts**(): `Promise`<`Array`<`Buffer`>>

_Defined in [src/index.ts:125](https://github.com/StylusFrost/fluree-simple-keyring/blob/2ebbdeb/src/index.ts#L125)_

**Returns:** `Promise`<`Array`<`Buffer`>>

---

<a id="getappkeyauthid"></a>

### getAppKeyAuthID

▸ **getAppKeyAuthID**(authID: _`Buffer`_, origin: _`string`_): `Promise`<`Buffer`>

_Defined in [src/index.ts:151](https://github.com/StylusFrost/fluree-simple-keyring/blob/2ebbdeb/src/index.ts#L151)_

**Parameters:**

| Name   | Type     |
| ------ | -------- |
| authID | `Buffer` |
| origin | `string` |

**Returns:** `Promise`<`Buffer`>

---

<a id="getmaxlisteners"></a>

### getMaxListeners

▸ **getMaxListeners**(): `number`

_Inherited from EventEmitter.getMaxListeners_

_Overrides EventEmitter.getMaxListeners_

_Defined in node_modules/@types/node/events.d.ts:41_

**Returns:** `number`

---

<a id="getprivatekeyfor"></a>

### `<Private>` getPrivateKeyFor

▸ **getPrivateKeyFor**(authID: _`Buffer`_, opts?: _`object`_): `Buffer`

_Defined in [src/index.ts:27](https://github.com/StylusFrost/fluree-simple-keyring/blob/2ebbdeb/src/index.ts#L27)_

**Parameters:**

| Name                 | Type     | Default value |
| -------------------- | -------- | ------------- |
| authID               | `Buffer` | -             |
| `Default value` opts | `object` | {}            |

**Returns:** `Buffer`

---

<a id="getwalletforaccount"></a>

### `<Private>` getWalletForAccount

▸ **getWalletForAccount**(authID: _`Buffer`_, opts?: _`any`_): `Wallet`

_Defined in [src/index.ts:39](https://github.com/StylusFrost/fluree-simple-keyring/blob/2ebbdeb/src/index.ts#L39)_

**Parameters:**

| Name                 | Type     | Default value |
| -------------------- | -------- | ------------- |
| authID               | `Buffer` | -             |
| `Default value` opts | `any`    | {}            |

**Returns:** `Wallet`

---

<a id="listenercount"></a>

### listenerCount

▸ **listenerCount**(type: _`string` \| `symbol`_): `number`

_Inherited from EventEmitter.listenerCount_

_Overrides EventEmitter.listenerCount_

_Defined in node_modules/@types/node/events.d.ts:46_

**Parameters:**

| Name | Type                 |
| ---- | -------------------- |
| type | `string` \| `symbol` |

**Returns:** `number`

---

<a id="listeners"></a>

### listeners

▸ **listeners**(event: _`string` \| `symbol`_): `Function`[]

_Inherited from EventEmitter.listeners_

_Overrides EventEmitter.listeners_

_Defined in node_modules/@types/node/events.d.ts:42_

**Parameters:**

| Name  | Type                 |
| ----- | -------------------- |
| event | `string` \| `symbol` |

**Returns:** `Function`[]

---

<a id="off"></a>

### off

▸ **off**(event: _`string` \| `symbol`_, listener: _`function`_): `this`

_Inherited from EventEmitter.off_

_Overrides EventEmitter.off_

_Defined in node_modules/@types/node/events.d.ts:38_

**Parameters:**

| Name     | Type                 |
| -------- | -------------------- |
| event    | `string` \| `symbol` |
| listener | `function`           |

**Returns:** `this`

---

<a id="on"></a>

### on

▸ **on**(event: _`string` \| `symbol`_, listener: _`function`_): `this`

_Inherited from EventEmitter.on_

_Overrides EventEmitter.on_

_Defined in node_modules/@types/node/events.d.ts:33_

**Parameters:**

| Name     | Type                 |
| -------- | -------------------- |
| event    | `string` \| `symbol` |
| listener | `function`           |

**Returns:** `this`

---

<a id="once"></a>

### once

▸ **once**(event: _`string` \| `symbol`_, listener: _`function`_): `this`

_Inherited from EventEmitter.once_

_Overrides EventEmitter.once_

_Defined in node_modules/@types/node/events.d.ts:34_

**Parameters:**

| Name     | Type                 |
| -------- | -------------------- |
| event    | `string` \| `symbol` |
| listener | `function`           |

**Returns:** `this`

---

<a id="prependlistener"></a>

### prependListener

▸ **prependListener**(event: _`string` \| `symbol`_, listener: _`function`_): `this`

_Inherited from EventEmitter.prependListener_

_Overrides EventEmitter.prependListener_

_Defined in node_modules/@types/node/events.d.ts:35_

**Parameters:**

| Name     | Type                 |
| -------- | -------------------- |
| event    | `string` \| `symbol` |
| listener | `function`           |

**Returns:** `this`

---

<a id="prependoncelistener"></a>

### prependOnceListener

▸ **prependOnceListener**(event: _`string` \| `symbol`_, listener: _`function`_): `this`

_Inherited from EventEmitter.prependOnceListener_

_Overrides EventEmitter.prependOnceListener_

_Defined in node_modules/@types/node/events.d.ts:36_

**Parameters:**

| Name     | Type                 |
| -------- | -------------------- |
| event    | `string` \| `symbol` |
| listener | `function`           |

**Returns:** `this`

---

<a id="rawlisteners"></a>

### rawListeners

▸ **rawListeners**(event: _`string` \| `symbol`_): `Function`[]

_Inherited from EventEmitter.rawListeners_

_Overrides EventEmitter.rawListeners_

_Defined in node_modules/@types/node/events.d.ts:43_

**Parameters:**

| Name  | Type                 |
| ----- | -------------------- |
| event | `string` \| `symbol` |

**Returns:** `Function`[]

---

<a id="removeaccount"></a>

### removeAccount

▸ **removeAccount**(authID: _`Buffer`_): `void`

_Defined in [src/index.ts:140](https://github.com/StylusFrost/fluree-simple-keyring/blob/2ebbdeb/src/index.ts#L140)_

**Parameters:**

| Name   | Type     |
| ------ | -------- |
| authID | `Buffer` |

**Returns:** `void`

---

<a id="removealllisteners"></a>

### removeAllListeners

▸ **removeAllListeners**(event: _`string` \| `symbol`_): `this`

_Inherited from EventEmitter.removeAllListeners_

_Overrides EventEmitter.removeAllListeners_

_Defined in node_modules/@types/node/events.d.ts:39_

**Parameters:**

| Name             | Type                 |
| ---------------- | -------------------- |
| `Optional` event | `string` \| `symbol` |

**Returns:** `this`

---

<a id="removelistener"></a>

### removeListener

▸ **removeListener**(event: _`string` \| `symbol`_, listener: _`function`_): `this`

_Inherited from EventEmitter.removeListener_

_Overrides EventEmitter.removeListener_

_Defined in node_modules/@types/node/events.d.ts:37_

**Parameters:**

| Name     | Type                 |
| -------- | -------------------- |
| event    | `string` \| `symbol` |
| listener | `function`           |

**Returns:** `this`

---

<a id="serialize"></a>

### serialize

▸ **serialize**(): `any`

_Defined in [src/index.ts:88](https://github.com/StylusFrost/fluree-simple-keyring/blob/2ebbdeb/src/index.ts#L88)_

**Returns:** `any`

---

<a id="setmaxlisteners"></a>

### setMaxListeners

▸ **setMaxListeners**(n: _`number`_): `this`

_Inherited from EventEmitter.setMaxListeners_

_Overrides EventEmitter.setMaxListeners_

_Defined in node_modules/@types/node/events.d.ts:40_

**Parameters:**

| Name | Type     |
| ---- | -------- |
| n    | `number` |

**Returns:** `this`

---

<a id="signquery"></a>

### signQuery

▸ **signQuery**(authID: _`Buffer`_, query: _`Query`_, opts?: _`object`_): `Promise`<`Query`>

_Defined in [src/index.ts:62](https://github.com/StylusFrost/fluree-simple-keyring/blob/2ebbdeb/src/index.ts#L62)_

**Parameters:**

| Name                 | Type     | Default value |
| -------------------- | -------- | ------------- |
| authID               | `Buffer` | -             |
| query                | `Query`  | -             |
| `Default value` opts | `object` | {}            |

**Returns:** `Promise`<`Query`>

---

<a id="signrequest"></a>

### signRequest

▸ **signRequest**(authID: _`Buffer`_, request: _`Request`_, opts?: _`object`_): `Promise`<`Request`>

_Defined in [src/index.ts:79](https://github.com/StylusFrost/fluree-simple-keyring/blob/2ebbdeb/src/index.ts#L79)_

**Parameters:**

| Name                 | Type      | Default value |
| -------------------- | --------- | ------------- |
| authID               | `Buffer`  | -             |
| request              | `Request` | -             |
| `Default value` opts | `object`  | {}            |

**Returns:** `Promise`<`Request`>

---

<a id="signtransaction"></a>

### signTransaction

▸ **signTransaction**(authID: _`Buffer`_, tx: _`Transaction`_, opts?: _`object`_): `Promise`<`Transaction`>

_Defined in [src/index.ts:71](https://github.com/StylusFrost/fluree-simple-keyring/blob/2ebbdeb/src/index.ts#L71)_

**Parameters:**

| Name                 | Type          | Default value |
| -------------------- | ------------- | ------------- |
| authID               | `Buffer`      | -             |
| tx                   | `Transaction` | -             |
| `Default value` opts | `object`      | {}            |

**Returns:** `Promise`<`Transaction`>

---

<a id="listenercount-1"></a>

### `<Static>` listenerCount

▸ **listenerCount**(emitter: _`EventEmitter`_, event: _`string` \| `symbol`_): `number`

_Inherited from EventEmitter.listenerCount_

_Defined in node_modules/@types/node/events.d.ts:29_

**Parameters:**

| Name    | Type                 |
| ------- | -------------------- |
| emitter | `EventEmitter`       |
| event   | `string` \| `symbol` |

**Returns:** `number`

---
