module Day02 where

import System.IO (readFile)

import Data.Text (Text)
import qualified Data.Text as T
import qualified Data.Text.Read as TR
import Data.Either (rights)

run :: IO ()
run = do
    input <- readFile "input/day02.txt"
    let result1 = part1 (T.pack input)
        result2 = part2 (T.pack input)
    putStrLn $ "Day 02, Part 1: " ++ show result1
    putStrLn $ "Day 02, Part 2: " ++ show result2

part1 :: Text -> Int
part1 input = result
  where
    cleanedLines =  T.lines input
    result = length $ filter isSafe $ map parseLine cleanedLines

part2 :: Text -> Int
part2 input = result
  where
    cleanedLines =  T.lines input
    result = length $ filter isSafeOrCanBeMadeSafe $ map parseLine cleanedLines

parseLine :: Text -> [Int]
parseLine line = rights $ map (fmap fst . TR.decimal) (T.words line)

isSafe :: [Int] -> Bool
isSafe levels = signTest && scalarTest
    where
    state = if head levels < levels !! 1 then Just "asc" else Just "desc"

    signTest = all (\(prev, curr) ->
        case state of
        Just "asc" -> curr >= prev
        Just "desc" -> curr <= prev
        _           -> False) (zip levels (tail levels))

    scalarTest = all (> 0) scalars && all (<= 3) scalars
        where
        scalars = zipWith (\x y -> abs (x - y)) levels (tail levels)

isSafeOrCanBeMadeSafe :: [Int] -> Bool
isSafeOrCanBeMadeSafe levels
  | isSafe levels = True
  | otherwise = any (isSafe . removeIndex levels) [0..length levels - 1]

removeIndex :: [a] -> Int -> [a]
removeIndex xs i = take i xs ++ drop (i + 1) xs
