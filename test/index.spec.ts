/* tslint:disable no-invalid-this */
import assert = require('assert')
import SimpleKeyring from '../src'
import { isValidAuthID } from 'flureejs-utils'
import Query from 'flureejs-query'
import Transaction from 'flureejs-tx'
import Request from 'flureejs-request'

const stripHexPrefix = require('strip-hex-prefix')

const TYPE_STR = 'Simple Key Pair'

// Sample account:
const testAccount = {
  key: Buffer.from('6a5f415f49986006815ae7887016275aac8ffb239f9a2fa7172300578582b6c2', 'hex'),
  authID: Buffer.from(
    '5466477641644b48326e526456347a503479427a346b4a325239577a59484465324556',
    'hex',
  ),
}

describe('simple-keyring', () => {
  let keyring: SimpleKeyring
  beforeEach(() => {
    keyring = new SimpleKeyring()
  })

  describe('Keyring.type', () => {
    it('is a class property that returns the type string.', () => {
      const { type } = SimpleKeyring
      assert.equal(type, TYPE_STR)
    })
  })

  describe('#type', () => {
    it('returns the correct value', () => {
      const { type } = keyring
      assert.equal(type, TYPE_STR)
    })
  })

  describe('#serialize empty wallets.', () => {
    it('serializes an empty array', async () => {
      const output = await keyring.serialize()
      assert.deepEqual(output, [])
    })
  })

  describe('#deserialize a private key', () => {
    it('serializes what it deserializes', async () => {
      await keyring.deserialize([testAccount.key])
      assert.equal(keyring.wallets.length, 1, 'has one wallet')
      const serialized = await keyring.serialize()
      assert.equal(serialized[0], stripHexPrefix(testAccount.key))
      const accounts = await keyring.getAccounts()
      assert.deepEqual(accounts, [testAccount.authID], 'accounts match expected')
    })
  })

  describe('#constructor with a private key', () => {
    it('has the correct authIDes', async () => {
      const newKeyring = new SimpleKeyring([testAccount.key])
      const accounts = await newKeyring.getAccounts()
      assert.deepEqual(accounts, [testAccount.authID], 'accounts match expected')
    })
  })

  describe('#signQuery', () => {
    const authID = Buffer.from(
      '5466477641644b48326e526456347a503479427a346b4a325239577a59484465324556',
      'hex',
    )
    const privateKey = Buffer.from(
      '6a5f415f49986006815ae7887016275aac8ffb239f9a2fa7172300578582b6c2',
      'hex',
    )

    it('returns a signed query object', async () => {
      await keyring.deserialize([privateKey])

      const queryParams = {
        from: '0x' + authID.toString('hex'),
        param: '0x6869207468657265',
        type: '0x7175657279',
        host: '0x6c6f63616c686f7374',
        db: '0x61756469747a6f6e652d746573746e65742f7365616c6462',
        formattedDate: '0x5475652c2031382041756720323032302030393a30323a353420474d54',
        auth: '0x',
      }
      const query = new Query(queryParams)
      const signed = await keyring.signQuery(authID, query)
      assert.ok(signed.raw, 'has a raw signature')
    })
  })

  describe('#signTransaction', () => {
    const authID = Buffer.from(
      '5466477641644b48326e526456347a503479427a346b4a325239577a59484465324556',
      'hex',
    )
    const privateKey = Buffer.from(
      '6a5f415f49986006815ae7887016275aac8ffb239f9a2fa7172300578582b6c2',
      'hex',
    )

    it('returns a signed tx object', async () => {
      await keyring.deserialize([privateKey])

      const txParams = {
        from: '0x' + authID.toString('hex'),
        type: '0x7478',
        db: '0x61756469747a6f6e652d746573746e65742f7365616c6462',
        tx:
          '0x5b7b225f6964223a225f636f6c6c656374696f6e247365616c222c226e616d65223a227365616c222c22646f63223a224120636f6c6c656374696f6e20746f20686f6c642074686520696e666f726d6174696f6e206f6620746865207365616c73227d5d',
        auth: '0x5466386f764864676e445a58724d7a71454c706131787331636664684a696533507761',
        fuel: '0x0f4240',
        nonce: '0x2e',
        expire: '0x017410ddd6e2',
      }
      const tx = new Transaction(txParams)
      const signed = await keyring.signTransaction(authID, tx)
      assert.ok(signed.raw, 'has a raw signature')
    })
  })

  describe('#signRequest', () => {
    const authID = Buffer.from(
      '5466477641644b48326e526456347a503479427a346b4a325239577a59484465324556',
      'hex',
    )
    const privateKey = Buffer.from(
      '6a5f415f49986006815ae7887016275aac8ffb239f9a2fa7172300578582b6c2',
      'hex',
    )

    it('returns a signed request object', async () => {
      await keyring.deserialize([privateKey])

      const requestParams = {
        from: '0x' + authID.toString('hex'),
        param: '0x7b7d',
        type: '0x6c6973742d736e617073686f7473',
        host: '0x6c6f63616c686f7374',
        db: '0x61756469747a6f6e652d746573746e65742f7365616c6462',
        formattedDate: '0x5475652c2031382041756720323032302030393a30323a353420474d54',
        auth: '0x',
      }
      const request = new Request(requestParams)
      const signed = await keyring.signRequest(authID, request)
      assert.ok(signed.raw, 'has a raw signature')
    })
  })

  describe('#addAccounts', () => {
    describe('with no arguments', () => {
      it('creates a single wallet', async () => {
        await keyring.addAccounts()
        assert.equal(keyring.wallets.length, 1)
      })
    })

    describe('with a numeric argument', () => {
      it('creates that number of wallets', async () => {
        await keyring.addAccounts(3)
        assert.equal(keyring.wallets.length, 3)
      })
    })
  })

  describe('#removeAccount', () => {
    describe('if the account exists', () => {
      it('should remove that account', async () => {
        await keyring.addAccounts()
        const authIDs = await keyring.getAccounts()
        keyring.removeAccount(authIDs[0])
        const authIDesAfterRemoval = await keyring.getAccounts()
        assert.equal(authIDesAfterRemoval.length, authIDs.length - 1)
      })
    })

    describe('if the account does not exist', () => {
      it('should throw an error', () => {
        const unexistingAccount = Buffer.from('0000000000000000000000000000000000000000', 'hex')
        assert.throws(function() {
          keyring.removeAccount(unexistingAccount)
        }, /^Error: AuthID 0000000000000000000000000000000000000000 not found in this keyring$/)
      })
    })
  })
  describe('#exportAccount', () => {
    describe('if the account exists', () => {
      it('should export that account', async () => {
        await keyring.addAccounts()
        const authIDs = await keyring.getAccounts()
        const exportAccount = keyring.exportAccount(authIDs[0])
        assert.ok(exportAccount, 'Export Account is working')
      })
    })

    describe('if the account does not exist', () => {
      it('should throw an error', () => {
        const unexistingAccount = Buffer.from('0000000000000000000000000000000000000000', 'hex')
        assert.throws(function() {
          keyring
            .exportAccount(unexistingAccount)
            .then()
            .catch(err => {
              throw err
            })
        }, /^Error: Simple Keyring - Unable to find matching authID.$/)
      })
    })
  })

  describe('getAppKeyAuthID', function() {
    it('should return a public authID custom to the provided app key origin', async function() {
      const { authID } = testAccount
      const simpleKeyring = new SimpleKeyring([testAccount.key])

      const appKeyAuthID = await simpleKeyring.getAppKeyAuthID(authID, 'someapp.origin.io')
      assert.notEqual(Buffer.compare(authID, appKeyAuthID) === 0 ? true : false, true)
      assert(isValidAuthID(appKeyAuthID))
    })

    it('should return different authIDes when provided different app key origins', async function() {
      const { authID } = testAccount
      const simpleKeyring = new SimpleKeyring([testAccount.key])

      const appKeyAuthID1 = await simpleKeyring.getAppKeyAuthID(authID, 'someapp.origin.io')

      assert(isValidAuthID(appKeyAuthID1))

      const appKeyAuthID2 = await simpleKeyring.getAppKeyAuthID(authID, 'anotherapp.origin.io')

      assert(isValidAuthID(appKeyAuthID2))

      assert.notEqual(Buffer.compare(appKeyAuthID1, appKeyAuthID2) === 0 ? true : false, true)
    })

    it('should return the same authID when called multiple times with the same params', async function() {
      const { authID } = testAccount
      const simpleKeyring = new SimpleKeyring([testAccount.key])

      const appKeyAuthID1 = await simpleKeyring.getAppKeyAuthID(authID, 'someapp.origin.io')

      assert(isValidAuthID(appKeyAuthID1))

      const appKeyAuthID2 = await simpleKeyring.getAppKeyAuthID(authID, 'someapp.origin.io')

      assert(isValidAuthID(appKeyAuthID2))

      assert.equal(Buffer.compare(appKeyAuthID1, appKeyAuthID2) === 0 ? true : false, true)
    })

    it('should throw error if the provided origin is not a string', async function() {
      const { authID } = testAccount
      const simpleKeyring = new SimpleKeyring([testAccount.key])

      try {
        await simpleKeyring.getAppKeyAuthID(authID, '')
      } catch (error) {
        assert(error instanceof Error, 'Value thrown is not an error')
        return
      }
      assert.fail('Should have thrown error')
    })

    it('should throw error if the provided origin is an empty string', async function() {
      const { authID } = testAccount
      const simpleKeyring = new SimpleKeyring([testAccount.key])

      try {
        await simpleKeyring.getAppKeyAuthID(authID, '')
      } catch (error) {
        assert(error instanceof Error, 'Value thrown is not an error')
        return
      }
      assert.fail('Should have thrown error')
    })
  })

  describe('signing methods withAppKeyOrigin option', function() {
    it('should signQuery with the expected key when passed a withAppKeyOrigin', function() {
      const { authID } = testAccount

      const queryParams = {
        from: '0x' + authID.toString('hex'),
        param: '0x6869207468657265',
        type: '0x7175657279',
        host: '0x6c6f63616c686f7374',
        db: '0x61756469747a6f6e652d746573746e65742f7365616c6462',
        formattedDate: '0x5475652c2031382041756720323032302030393a30323a353420474d54',
        auth: '0x',
      }
      const simpleKeyring = new SimpleKeyring([testAccount.key])

      const query = new Query(queryParams)
      return simpleKeyring
        .signQuery(authID, query)
        .then(() => {
          assert.equal(
            query.r.toString('hex'),
            'cbd32e463567fefc2f120425b0224d9d263008911653f50e83953f47cfbef3bc',
          )
          assert.equal(
            query.s.toString('hex'),
            '50e972935dc3a6c122a92260f5dcd2db1a7288217bdc43dcd2ee2c8c0f79185d',
          )
        })
        .catch(reason => {
          assert.ok(false, reason)
        })
    })
    it('should signRequest with the expected key when passed a withAppKeyOrigin', function() {
      const { authID } = testAccount
      const requestParams = {
        from: '0x' + authID.toString('hex'),
        param: '0x7b7d',
        type: '0x6c6973742d736e617073686f7473',
        host: '0x6c6f63616c686f7374',
        db: '0x61756469747a6f6e652d746573746e65742f7365616c6462',
        formattedDate: '0x5475652c2031382041756720323032302030393a30323a353420474d54',
        auth: '0x',
      }
      const simpleKeyring = new SimpleKeyring([testAccount.key])
      const request = new Request(requestParams)
      return simpleKeyring
        .signRequest(authID, request, {
          withAppKeyOrigin: 'someapp.origin.io',
        })
        .then(() => {
          assert.equal(
            request.r.toString('hex'),
            'cbd32e463567fefc2f120425b0224d9d263008911653f50e83953f47cfbef3bc',
          )
          assert.equal(
            request.s.toString('hex'),
            '20c2f65b98f76dab52660fa9defd3bdf7184ab99ec7512e8c89e532b06cf0aff',
          )
        })
        .catch(reason => {
          assert.ok(false, reason)
        })
    })

    it('should signTransaction with the expected key when passed a withAppKeyOrigin', function() {
      const { authID } = testAccount
      const txParams = {
        from: '0x' + authID.toString('hex'),
        type: '0x7478',
        db: '0x61756469747a6f6e652d746573746e65742f7365616c6462',
        tx:
          '0x5b7b225f6964223a225f636f6c6c656374696f6e247365616c222c226e616d65223a227365616c222c22646f63223a224120636f6c6c656374696f6e20746f20686f6c642074686520696e666f726d6174696f6e206f6620746865207365616c73227d5d',
        auth: '0x5466386f764864676e445a58724d7a71454c706131787331636664684a696533507761',
        fuel: '0x0f4240',
        nonce: '0x2e',
        expire: '0x017410ddd6e2',
      }
      const simpleKeyring = new SimpleKeyring([testAccount.key])
      const tx = new Transaction(txParams)
      return simpleKeyring
        .signTransaction(authID, tx)
        .then(() => {
          assert.equal(
            tx.r.toString('hex'),
            'cbd32e463567fefc2f120425b0224d9d263008911653f50e83953f47cfbef3bc',
          )
          assert.equal(
            tx.s.toString('hex'),
            'fb13ca731bdd6a2a8ab8ceae3f7a3fa6607e019f97315d406e4664b9c6bc1881',
          )
        })
        .catch(reason => {
          assert.ok(false, reason)
        })
    })
  })
})
