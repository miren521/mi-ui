/**
 * 可中断的 Promise
 */
export class AbortablePromise<T> {
  private promise: Promise<T>
  private abortCallback?: () => void
  private _isAborted = false

  constructor(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void) {
    this.promise = new Promise((resolve, reject) => {
      executor(
        (value) => {
          if (!this._isAborted) {
            resolve(value)
          }
        },
        (reason) => {
          if (!this._isAborted) {
            reject(reason)
          }
        }
      )
    })
  }

  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
  ): AbortablePromise<TResult1 | TResult2> {
    const newPromise = new AbortablePromise<TResult1 | TResult2>((resolve, reject) => {
      this.promise.then(onfulfilled, onrejected).then(resolve, reject)
    })
    newPromise.abortCallback = this.abortCallback
    return newPromise
  }

  catch<TResult = never>(
    onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
  ): AbortablePromise<T | TResult> {
    const newPromise = new AbortablePromise<T | TResult>((resolve, reject) => {
      this.promise.catch(onrejected).then(resolve, reject)
    })
    newPromise.abortCallback = this.abortCallback
    return newPromise
  }

  finally(onfinally?: (() => void) | undefined | null): AbortablePromise<T> {
    const newPromise = new AbortablePromise<T>((resolve, reject) => {
      this.promise.finally(onfinally).then(resolve, reject)
    })
    newPromise.abortCallback = this.abortCallback
    return newPromise
  }

  abort() {
    this._isAborted = true
    if (this.abortCallback) {
      this.abortCallback()
    }
  }

  get isAborted() {
    return this._isAborted
  }
}