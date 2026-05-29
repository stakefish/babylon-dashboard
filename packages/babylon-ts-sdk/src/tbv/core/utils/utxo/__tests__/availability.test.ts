<<<<<<<< HEAD:packages/babylon-ts-sdk/src/tbv/core/utils/utxo/__tests__/availability.test.ts
/** Tests for UTXO availability validation. */

import { describe, expect, it } from "vitest";
========
/** Tests for UTXO validation service (I/O wrapper layer). */

import { getAddressUtxos } from "@babylonlabs-io/ts-sdk";
import { UtxoNotAvailableError } from "@babylonlabs-io/ts-sdk/tbv/core/utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
>>>>>>>> main:services/vault/src/services/vault/__tests__/vaultUtxoValidationService.test.ts

import {
  assertUtxosAvailable,
  validateUtxosAvailable,
<<<<<<<< HEAD:packages/babylon-ts-sdk/src/tbv/core/utils/utxo/__tests__/availability.test.ts
} from "../availability";
========
} from "../vaultUtxoValidationService";

vi.mock("@babylonlabs-io/ts-sdk", () => ({
  getAddressUtxos: vi.fn(),
}));

vi.mock("../../../clients/btc/config", () => ({
  getMempoolApiUrl: vi.fn(() => "https://mempool.space/api"),
}));

const mockedGetAddressUtxos = vi.mocked(getAddressUtxos);
>>>>>>>> main:services/vault/src/services/vault/__tests__/vaultUtxoValidationService.test.ts

// Valid transaction hex with single input (txid: aaa..., vout: 3)
const VALID_TX_SINGLE_INPUT =
  "0100000001" +
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
  "03000000" +
  "6b" +
  "483045022100884d142d86652a3f47ba4746ec719bbfbd040a570b1deccbb6498c75c4ae24cb02204b9f039ff08df09cbe9f6addac960298cad530a863ea8f53982c09db8f6e381301210484ecc0d46f1918b30928fa0e4ed99f16a0fb4fde0735e7ade8416ab9fe423cc5" +
  "ffffffff" +
  "01" +
  "605af40500000000" +
  "19" +
  "76a914887c6824d03eb8997b1e28c1d81b4e5c8c96d41688ac" +
  "00000000";

<<<<<<<< HEAD:packages/babylon-ts-sdk/src/tbv/core/utils/utxo/__tests__/availability.test.ts
// Helper to create a valid transaction hex with multiple inputs
function createMultiInputTxHex(
  inputs: Array<{ txidLE: string; vout: number }>,
): string {
  const inputCount = inputs.length.toString(16).padStart(2, "0");
  let inputsHex = "";

  for (const input of inputs) {
    const voutHex = input.vout.toString(16).padStart(8, "0");
    const voutLE =
      voutHex.slice(6, 8) +
      voutHex.slice(4, 6) +
      voutHex.slice(2, 4) +
      voutHex.slice(0, 2);

    inputsHex +=
      input.txidLE +
      voutLE +
      "6b" +
      "483045022100884d142d86652a3f47ba4746ec719bbfbd040a570b1deccbb6498c75c4ae24cb02204b9f039ff08df09cbe9f6addac960298cad530a863ea8f53982c09db8f6e381301210484ecc0d46f1918b30928fa0e4ed99f16a0fb4fde0735e7ade8416ab9fe423cc5" +
      "ffffffff";
  }

  return (
    "01000000" +
    inputCount +
    inputsHex +
    "01" +
    "605af40500000000" +
    "19" +
    "76a914887c6824d03eb8997b1e28c1d81b4e5c8c96d41688ac" +
    "00000000"
  );
}

describe("UTXO availability validation", () => {
  describe("extractInputsFromTransaction", () => {
    it("should extract inputs from valid transaction hex", () => {
      const inputs = extractInputsFromTransaction(VALID_TX_SINGLE_INPUT);

      expect(inputs).toHaveLength(1);
      expect(inputs[0].txid).toBe(
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      );
      expect(inputs[0].vout).toBe(3);
    });

    it("should handle 0x-prefixed transaction hex", () => {
      const inputs = extractInputsFromTransaction("0x" + VALID_TX_SINGLE_INPUT);

      expect(inputs).toHaveLength(1);
      expect(inputs[0].txid).toBe(
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      );
      expect(inputs[0].vout).toBe(3);
    });

    it("should extract multiple inputs from multi-input transaction", () => {
      const multiInputTx = createMultiInputTxHex([
        {
          txidLE:
            "1111111111111111111111111111111111111111111111111111111111111111",
          vout: 0,
        },
        {
          txidLE:
            "2222222222222222222222222222222222222222222222222222222222222222",
          vout: 5,
        },
        {
          txidLE:
            "3333333333333333333333333333333333333333333333333333333333333333",
          vout: 10,
        },
      ]);

      const inputs = extractInputsFromTransaction(multiInputTx);

      expect(inputs).toHaveLength(3);
      expect(inputs[0].txid).toBe(
        "1111111111111111111111111111111111111111111111111111111111111111",
      );
      expect(inputs[0].vout).toBe(0);
      expect(inputs[1].txid).toBe(
        "2222222222222222222222222222222222222222222222222222222222222222",
      );
      expect(inputs[1].vout).toBe(5);
      expect(inputs[2].txid).toBe(
        "3333333333333333333333333333333333333333333333333333333333333333",
      );
      expect(inputs[2].vout).toBe(10);
    });

    it("should throw clear error for invalid transaction hex", () => {
      expect(() => extractInputsFromTransaction("invalid-hex")).toThrow(
        "Failed to parse BTC transaction",
      );
    });

    it("should throw clear error for empty string", () => {
      expect(() => extractInputsFromTransaction("")).toThrow(
        "Failed to parse BTC transaction",
      );
    });

    it("should throw clear error for truncated hex", () => {
      expect(() => extractInputsFromTransaction("01000000")).toThrow(
        "Failed to parse BTC transaction",
      );
    });
  });

  describe("validateUtxosAvailable", () => {
    it("should return allAvailable: true when all UTXOs exist", () => {
      const availableUtxos = [
========
describe("vaultUtxoValidationService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("validateUtxosAvailable", () => {
    const TEST_ADDRESS = "bc1qtest...";

    it("should fetch UTXOs and delegate to SDK validation", async () => {
      mockedGetAddressUtxos.mockResolvedValue([
>>>>>>>> main:services/vault/src/services/vault/__tests__/vaultUtxoValidationService.test.ts
        {
          txid: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          vout: 3,
        },
      ];

      const result = validateUtxosAvailable(
        VALID_TX_SINGLE_INPUT,
        availableUtxos,
      );

      expect(mockedGetAddressUtxos).toHaveBeenCalledWith(
        TEST_ADDRESS,
        "https://mempool.space/api",
      );
      expect(result.allAvailable).toBe(true);
      expect(result.totalInputs).toBe(1);
    });

<<<<<<<< HEAD:packages/babylon-ts-sdk/src/tbv/core/utils/utxo/__tests__/availability.test.ts
    it("should return allAvailable: false when UTXO is missing", () => {
      const result = validateUtxosAvailable(VALID_TX_SINGLE_INPUT, []);
========
    it("should return missing UTXOs when mempool has none", async () => {
      mockedGetAddressUtxos.mockResolvedValue([]);

      const result = await validateUtxosAvailable(
        VALID_TX_SINGLE_INPUT,
        TEST_ADDRESS,
      );
>>>>>>>> main:services/vault/src/services/vault/__tests__/vaultUtxoValidationService.test.ts

      expect(result.allAvailable).toBe(false);
      expect(result.missingUtxos).toHaveLength(1);
    });

<<<<<<<< HEAD:packages/babylon-ts-sdk/src/tbv/core/utils/utxo/__tests__/availability.test.ts
    it("should detect multiple missing UTXOs", () => {
      const multiInputTx = createMultiInputTxHex([
        {
          txidLE:
            "1111111111111111111111111111111111111111111111111111111111111111",
          vout: 0,
        },
        {
          txidLE:
            "2222222222222222222222222222222222222222222222222222222222222222",
          vout: 1,
        },
      ]);

      const availableUtxos = [
        {
          txid: "1111111111111111111111111111111111111111111111111111111111111111",
          vout: 0,
        },
      ];

      const result = validateUtxosAvailable(multiInputTx, availableUtxos);

      expect(result.allAvailable).toBe(false);
      expect(result.missingUtxos).toHaveLength(1);
      expect(result.missingUtxos[0].txid).toBe(
        "2222222222222222222222222222222222222222222222222222222222222222",
      );
      expect(result.missingUtxos[0].vout).toBe(1);
      expect(result.totalInputs).toBe(2);
    });

    it("should handle 0x-prefixed transaction hex", () => {
      const availableUtxos = [
        {
          txid: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          vout: 3,
        },
      ];

      const result = validateUtxosAvailable(
        "0x" + VALID_TX_SINGLE_INPUT,
        availableUtxos,
      );

      expect(result.allAvailable).toBe(true);
    });

    it("should match UTXOs case-insensitively", () => {
      const availableUtxos = [
        {
          txid: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
          vout: 3,
        },
      ];
========
    it("should propagate mempool API errors on validate", async () => {
      mockedGetAddressUtxos.mockRejectedValue(new Error("API unavailable"));
>>>>>>>> main:services/vault/src/services/vault/__tests__/vaultUtxoValidationService.test.ts

      const result = validateUtxosAvailable(
        VALID_TX_SINGLE_INPUT,
        availableUtxos,
      );

      expect(result.allAvailable).toBe(true);
    });

    it("should throw when transaction contains duplicate inputs", () => {
      const duplicateInputTx = createMultiInputTxHex([
        {
          txidLE:
            "1111111111111111111111111111111111111111111111111111111111111111",
          vout: 0,
        },
        {
          txidLE:
            "1111111111111111111111111111111111111111111111111111111111111111",
          vout: 0,
        },
      ]);

      const availableUtxos = [
        {
          txid: "1111111111111111111111111111111111111111111111111111111111111111",
          vout: 0,
        },
      ];

      expect(() =>
        validateUtxosAvailable(duplicateInputTx, availableUtxos),
      ).toThrow(/duplicate input/i);
    });

    it("should accept UTXOs with extra properties beyond UtxoRef", () => {
      const availableUtxos = [
        {
          txid: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          vout: 3,
          value: 100000,
          scriptPubKey: "script",
          confirmed: true,
        },
      ];

      const result = validateUtxosAvailable(
        VALID_TX_SINGLE_INPUT,
        availableUtxos,
      );

      expect(result.allAvailable).toBe(true);
    });
  });

  describe("assertUtxosAvailable", () => {
    it("should not throw when all UTXOs are available", () => {
      const availableUtxos = [
        {
          txid: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          vout: 3,
        },
      ];

      expect(() =>
        assertUtxosAvailable(VALID_TX_SINGLE_INPUT, availableUtxos),
      ).not.toThrow();
    });

    it("should throw UtxoNotAvailableError when UTXO is missing", () => {
      expect(() =>
        assertUtxosAvailable(VALID_TX_SINGLE_INPUT, []),
      ).toThrow(UtxoNotAvailableError);
    });

<<<<<<<< HEAD:packages/babylon-ts-sdk/src/tbv/core/utils/utxo/__tests__/availability.test.ts
    it("should include missing UTXOs in error", () => {
      try {
        assertUtxosAvailable(VALID_TX_SINGLE_INPUT, []);
        expect.fail("Should have thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(UtxoNotAvailableError);
        const utxoError = error as UtxoNotAvailableError;
        expect(utxoError.missingUtxos).toHaveLength(1);
        expect(utxoError.missingUtxos[0].txid).toBe(
          "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        );
      }
    });

    it("should have singular message for one missing UTXO", () => {
      try {
        assertUtxosAvailable(VALID_TX_SINGLE_INPUT, []);
      } catch (error) {
        expect(error).toBeInstanceOf(UtxoNotAvailableError);
        expect((error as Error).message).toContain("The UTXO for this peg-in");
        expect((error as Error).message).not.toContain("UTXOs");
      }
    });

    it("should have plural message for multiple missing UTXOs", () => {
      const multiInputTx = createMultiInputTxHex([
        {
          txidLE:
            "1111111111111111111111111111111111111111111111111111111111111111",
          vout: 0,
        },
        {
          txidLE:
            "2222222222222222222222222222222222222222222222222222222222222222",
          vout: 1,
        },
      ]);

      try {
        assertUtxosAvailable(multiInputTx, []);
      } catch (error) {
        expect(error).toBeInstanceOf(UtxoNotAvailableError);
        expect((error as Error).message).toContain("2 UTXOs for this peg-in");
      }
    });
  });

  describe("UtxoNotAvailableError", () => {
    it("should have correct name", () => {
      const error = new UtxoNotAvailableError([{ txid: "test", vout: 0 }]);
      expect(error.name).toBe("UtxoNotAvailableError");
    });

    it("should store missing UTXOs", () => {
      const missing = [
        { txid: "txid1", vout: 0 },
        { txid: "txid2", vout: 1 },
      ];
      const error = new UtxoNotAvailableError(missing);
      expect(error.missingUtxos).toEqual(missing);
    });

    it("should be instanceof Error", () => {
      const error = new UtxoNotAvailableError([{ txid: "test", vout: 0 }]);
      expect(error).toBeInstanceOf(Error);
========
    it("should propagate mempool API errors on assert", async () => {
      mockedGetAddressUtxos.mockRejectedValue(new Error("Network timeout"));

      await expect(
        assertUtxosAvailable(VALID_TX_SINGLE_INPUT, TEST_ADDRESS),
      ).rejects.toThrow("Network timeout");
>>>>>>>> main:services/vault/src/services/vault/__tests__/vaultUtxoValidationService.test.ts
    });
  });
});
