"use strict";
/**
 * If you know how iterators work and how they are consumed you would't need any extra library,
 *  since it can become very easy to build your own concurrency yourself.
 *    — @Endless
 *
 * Inspired by: @link https://stackoverflow.com/a/51020535/1123955
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.concurrencyExecuter = void 0;
/**
 * Huan's stackoverflow answer (code example) for `merge`:
 *  @link https://stackoverflow.com/a/69985103/1123955
 */
const index_js_1 = require("ix/asynciterable/index.js");
const executeTask = (task) =>
  async function* (iterator) {
    for (const one of iterator) {
      const result = await task(one);
      yield result;
    }
  };
/**
 * Execute task with the concurrency on an iterator
 * The order will not be guaranteed. (mostly will be different)
 */
const concurrencyExecuter =
  (concurrency = 1) =>
  (task) =>
    async function* (iterator) {
      if (Array.isArray(iterator)) {
        iterator = iterator.values();
      }
      const executer = executeTask(task);
      const resultIteratorList = new Array(concurrency)
        .fill(iterator)
        .map(executer);
      yield* (0, index_js_1.merge)(...resultIteratorList);
    };
exports.concurrencyExecuter = concurrencyExecuter;
//# sourceMappingURL=concurrency-executer.js.map
