import { FC, useCallback, useEffect, useState, useTransition } from "react";
import { twMerge } from "tailwind-merge";

// @todo add colors to the keyboard to help move the focus from start to end

export interface VirtualKeyboardProps {
  alphabet?: string[][];
  onInput?: (key: string) => void;
  onClear?: () => void;
  onSubmit?: () => void;
}

const EnglishLayout = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
  ["SPACE", "BACKSPACE", "ENTER"],
] as const;

type FocusedKey = { row: number; col: number } | null;

const KeyStyles =
  "select-none min-w-12 py-2 px-4 flex items-center border-2 border-transparent justify-center bg-gray-700 rounded-md text-lg font-semibold transition-transform hover:scale-105 hover:bg-gray-400 hover:border-white";
const ActiveStyles = "scale-105 bg-gray-400 border-white";

const VirtualKeyboard: FC<VirtualKeyboardProps> = ({
  alphabet,
  onInput,
  onSubmit,
  onClear,
}) => {
  const [focusedKey, setFocusedKey] = useState<FocusedKey>(null);
  const [_, startTransition] = useTransition();

  const keyboardLayout = alphabet || EnglishLayout;

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyPress);
    };
  });

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();
      switch (e.key) {
        case "ArrowUp":
          setFocusedKey((prev) => {
            if (prev === null) return { row: 0, col: 0 };

            return moveRow(prev.row, prev.col, -1);
          });
          break;
        case "ArrowDown":
          setFocusedKey((prev) => {
            if (prev === null) return { row: 0, col: 0 };

            return moveRow(prev.row, prev.col, 1);
          });
          break;
        case "ArrowLeft":
          setFocusedKey((prev) => {
            if (prev === null) return { row: 0, col: 0 };

            return moveCol(prev.row, prev.col, -1);
          });
          break;
        case "ArrowRight":
          setFocusedKey((prev) => {
            if (prev === null) return { row: 0, col: 0 };

            return moveCol(prev.row, prev.col, 1);
          });
          break;
      }
    },
    [focusedKey]
  );

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.code === "Space") {
        const key = keyboardLayout[focusedKey?.row ?? 0][focusedKey?.col ?? 0];
        pressKey(key);
      }
    },
    [focusedKey]
  );

  const moveRow = (row: number, col: number, direction: 1 | -1) => {
    const index = row + direction;
    const newRow =
      ((index % keyboardLayout.length) + keyboardLayout.length) %
      keyboardLayout.length;

    return {
      row: newRow,
      col: col % (keyboardLayout[newRow]?.length ?? col),
    };
  };

  const moveCol = (row: number, col: number, direction: 1 | -1) => {
    const index = col + direction;

    return {
      row: row,
      col:
        ((index % keyboardLayout[row].length) + keyboardLayout[row].length) %
        keyboardLayout[row].length,
    };
  };

  const focusKey = (row: number, col: number) => {
    startTransition(() => {
      setFocusedKey({ row, col });
    });
  };

  const pressKey = (key: string) => {
    switch (key) {
      case "SPACE":
        onInput?.(" ");
        break;
      case "ENTER":
        onSubmit?.();
        break;
      case "BACKSPACE":
        onClear?.();
        break;
      default:
        onInput?.(key);
    }
  };

  return (
    <div className="virtual-keyboard w-full">
      {keyboardLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1 pb-1">
          {row.map((key, keyIndex) => (
            <button
              type="button"
              key={`${rowIndex}-${keyIndex}`}
              className={twMerge(
                KeyStyles,
                focusedKey !== null &&
                  focusedKey.row === rowIndex &&
                  focusedKey.col === keyIndex
                  ? ActiveStyles
                  : "normal"
              )}
              onClick={() => pressKey(key)}
              onMouseEnter={() => focusKey(rowIndex, keyIndex)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default VirtualKeyboard;
