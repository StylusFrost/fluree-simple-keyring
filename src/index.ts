import { EventEmitter } from 'events'
import Wallet from 'flureejs-wallet'
const keccak256 = require('keccak256')
import Query from 'flureejs-query'
import Transaction from 'flureejs-tx'
import Request from 'flureejs-request'

// SimpleKeyring implementation

export default class SimpleKeyring extends EventEmitter {
  static type = 'Simple Key Pair'
  public readonly type: string = SimpleKeyring.type
  public wallets: Array<Wallet> = []
  constructor(opts?: any) {
    super()
    this.deserialize(opts)
      .then()
      .catch(err => {
        throw err
      })
  }

  // static methods

  // private getters

  private getPrivateKeyFor(authID: Buffer, opts: object = {}): Buffer {
    if (!authID) {
      throw new Error('Must specify authID.')
    }
    const wallet = this.getWalletForAccount(authID, opts)
    const privKey = wallet.getPrivateKey()
    return privKey
  }

  /**
   * Get specific wallet from an authID
   */
  private getWalletForAccount(authID: Buffer, opts: any = {}): Wallet {
    let wallet = this.wallets.find(w =>
      Buffer.compare(w.getAuthID(), authID) === 0 ? true : false,
    )
    if (!wallet) {
      throw new Error('Simple Keyring - Unable to find matching authID.')
    }
    if ('withAppKeyOrigin' in opts) {
      const privKey = wallet.getPrivateKey()
      const appKeyOriginBuffer = Buffer.from(opts['withAppKeyOrigin'], 'utf8')
      const appKeyBuffer = Buffer.concat([privKey, appKeyOriginBuffer])
      const appKeyPrivKey = keccak256(appKeyBuffer)
      wallet = Wallet.fromPrivateKey(appKeyPrivKey)
    }

    return wallet
  }

  // public instance methods

  /**
   * Sign fluree query
   */
  signQuery(authID: Buffer, query: Query, opts = {}) {
    const privKey = this.getPrivateKeyFor(authID, opts)
    query.sign(privKey)
    return Promise.resolve(query)
  }
  /**
   * Sign fluree transaction
   */

  signTransaction(authID: Buffer, tx: Transaction, opts = {}) {
    const privKey = this.getPrivateKeyFor(authID, opts)
    tx.sign(privKey)
    return Promise.resolve(tx)
  }
  /**
   * Sign fluree request
   */
  signRequest(authID: Buffer, request: Request, opts = {}) {
    const privKey = this.getPrivateKeyFor(authID, opts)
    request.sign(privKey)
    return Promise.resolve(request)
  }

  /**
   * Serialize all Private keys
   */
  public serialize(): any {
    return Promise.resolve(this.wallets.map(w => w.getPrivateKey()))
  }

  /**
   * Deserialize all Private Keys
   */
  public deserialize(privateKeys: Array<Buffer> = []) {
    return new Promise((resolve, reject) => {
      try {
        this.wallets = privateKeys.map(privateKey => {
          const wallet = Wallet.fromPrivateKey(privateKey)
          return wallet
        })
      } catch (e) {
        reject(e)
      }
      resolve()
    })
  }

  /**
   * Generate n new AuthID
   */
  public addAccounts(n: number | undefined = 1): Promise<Array<Buffer>> {
    const newWallets = []
    for (let i = 0; i < n; i++) {
      newWallets.push(Wallet.generate())
    }
    this.wallets = this.wallets.concat(newWallets)

    return Promise.resolve(newWallets.map(w => w.getAuthID()))
  }

  /**
   * Get all AuthIDs
   */
  public getAccounts(): Promise<Array<Buffer>> {
    return Promise.resolve(this.wallets.map(w => w.getAuthID()))
  }

  /**
   * ExportAccount
   */
  public exportAccount(authID: Buffer, opts = {}) {
    const wallet = this.getWalletForAccount(authID, opts)
    return Promise.resolve(wallet.getPrivateKey())
  }

  /**
   * Remove specific AuthID
   */
  public removeAccount(authID: Buffer) {
    if (!this.wallets.map(w => w.getAuthID().toString()).includes(authID.toString())) {
      throw new Error(`AuthID ${authID.toString('hex').normalize()} not found in this keyring`)
    }
    this.wallets = this.wallets.filter(w =>
      Buffer.compare(w.getAuthID(), authID) === 0 ? false : true,
    )
  }
  /**
   * Get an authID specific to an app
   */
  public getAppKeyAuthID(authID: Buffer, origin: string): Promise<Buffer> {
    if (!origin || origin === '') {
      throw new Error(`'origin' must be a non-empty string`)
    }
    return new Promise((resolve, reject) => {
      try {
        const wallet = this.getWalletForAccount(authID, {
          withAppKeyOrigin: origin,
        })
        const appKeyAuthID = wallet.getAuthID()
        return resolve(appKeyAuthID)
      } catch (e) {
        return reject(e)
      }
    })
  }
}
