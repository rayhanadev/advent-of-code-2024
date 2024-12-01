module Main where

import System.Environment (getArgs)
import qualified Day01

main :: IO ()
main = do
    args <- getArgs
    case args of
        [day] -> runDay day
        _     -> putStrLn "Usage: stack run <day> (e.g., stack run 1)"

runDay :: String -> IO ()
runDay "1" = Day01.run
runDay _   = putStrLn "Invalid day. Please specify a valid day (e.g., 1, 2)."
