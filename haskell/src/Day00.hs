module Day01 where

import System.IO (readFile)

import Data.Text (Text)
import qualified Data.Text as T

run :: IO ()
run = do
    input <- readFile "input/day00.txt"
    let result1 = part1 (T.pack input)
        result2 = part2 (T.pack input)
    putStrLn $ "Day 00, Part 1: " ++ show result1
    putStrLn $ "Day 00, Part 2: " ++ show result2

part1 :: Text -> Int
part1 input = result
  where
    cleanedLines = T.lines input
    result = 0

part2 :: Text -> Int
part2 input = result
  where
    cleanedLines = T.lines input
    result = 0
