module Day01 where

import System.IO (readFile)

import Data.List (sort)
import Data.Map (fromListWith, findWithDefault)
import Data.Text (Text)
import qualified Data.Text as T

run :: IO ()
run = do
    input <- readFile "input/day01.txt"
    let result1 = part1 (T.pack input)
        result2 = part2 (T.pack input)
    putStrLn $ "Day 01, Part 1: " ++ show result1
    putStrLn $ "Day 01, Part 2: " ++ show result2

part1 :: Text -> Int
part1 input = result
  where
    cleanedLines = T.lines input
    (listLeft, listRight) = unzip $ map parseLine cleanedLines
    sortedLeft = sort listLeft
    sortedRight = sort listRight
    scalars = zipWith (\left right -> abs (right - left)) sortedLeft sortedRight
    result = sum scalars

part2 :: Text -> Int
part2 input = result
  where
    cleanedLines = T.lines input
    (listLeft, listRight) = unzip $ map parseLine cleanedLines
    rightCounts = fromListWith (+) [(x, 1) | x <- listRight]
    indexes = map (\left -> let count = findWithDefault 0 left rightCounts in left * count) listLeft
    result = sum indexes

parseLine :: Text -> (Int, Int)
parseLine line = let [left, right] = map (read . T.unpack) (T.words line)
    in (left, right)
