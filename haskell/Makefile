STACK = stack
DAY ?= 1

build:
	$(STACK) build

run:
	$(STACK) run -- $(DAY)

INPUT_DIR = input
SRC_DIR = src

SRC_TEMPLATE = $(SRC_DIR)/Day00.hs

PADDED_DAY = $(shell printf "%02d" $(DAY))
NEW_SRC_FILE = $(SRC_DIR)/Day$(PADDED_DAY).hs
NEW_INPUT_FILE = $(INPUT_DIR)/day$(PADDED_DAY).txt

scaffold:
	@if [ -z "$(DAY)" ]; then \
	    echo "Error: DAY variable is not set. Use 'make scaffold DAY=<day>'."; \
	    exit 1; \
	fi
	@if [ -e $(NEW_SRC_FILE) ]; then \
	    echo "Error: $(NEW_SRC_FILE) already exists!"; \
	    exit 1; \
	fi

	@echo "Scaffolding Day $(PADDED_DAY)..."

	cp $(SRC_TEMPLATE) $(NEW_SRC_FILE)

	sed -i "s/Day 00/Day $(PADDED_DAY)/g" $(NEW_SRC_FILE)
	sed -i "s/day00/day$(PADDED_DAY)/g" $(NEW_SRC_FILE)

	touch $(NEW_INPUT_FILE)
	@echo "Created $(NEW_SRC_FILE) and $(NEW_INPUT_FILE)."

clean:
	$(STACK) clean

repl:
	$(STACK) ghci

.PHONY: build run clean repl
