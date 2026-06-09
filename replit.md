# Tech-God-Bot

A feature-rich WhatsApp bot built on Node.js using the `@whiskeysockets/baileys` library.

## Overview

This bot connects to WhatsApp Web via the Baileys multi-device API and provides:
- Auto-replies and custom reactions
- Media processing (images, stickers, video, audio)
- Group management tools
- Premium user system
- MongoDB or local JSON database support

## Project Structure

- `main.js` — Core bot logic (obfuscated)
- `config.js` / `settings.js` — Bot configuration (obfuscated)
- `start.js` — Process wrapper with auto-restart
- `simple.js` — Utility functions for message handling
- `lib/` — Language files and helper exports
- `lib2/` — Extended utilities (MongoDB, lowdb, ffmpeg helpers)
- `database/` — Local JSON storage (owner, premium users, bot state)
- `RishiMedia/` — Bot media assets (images, audio, stickers)
- `RishiPlugins/` — Auto-reply and reaction configs
- `69/session/` — WhatsApp session data (created on first auth)
- `src/database.json` — Persistent bot database

## Running the Bot

The workflow runs `npm start` which executes `node main.js`.

On first run, the bot will prompt:
1. Enter your phone number (with country code, no `+` or spaces)
2. A pairing code or QR will be provided to link your WhatsApp

## Compatibility Shims

The obfuscated source code references `@adiwajshing/baileys` (older package name) and `@library/wawebjs`. Both are shimmed in `node_modules/` to forward to the installed `@whiskeysockets/baileys` v7, with a `makeInMemoryStore` compatibility layer added since that function was removed in v7.

## User Preferences

- Package manager: npm
- Node version: 20
