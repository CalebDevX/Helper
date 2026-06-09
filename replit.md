# Achek Bot 2

A feature-rich WhatsApp bot built on Node.js using the `@whiskeysockets/baileys` library, branded for **Achek** (achek.com.ng).

## Overview

This bot connects to WhatsApp Web via the Baileys multi-device API and provides:
- Auto-replies and custom reactions
- Media processing (images, stickers, video, audio)
- Group management tools
- Premium user system
- MongoDB or local JSON database support

## Branding
- **Bot name**: Achek Bot 2
- **Website**: achek.com.ng
- **Owner number**: 2348104040841
- **Channel JID**: 120363402198872825@newsletter

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
- `attached_assets/generated_images/` — Achek Bot profile image

## Running the Bot

The workflow runs `node start.js` which auto-restarts on drops.

On first run, the bot will prompt:
1. Enter your phone number: `2348104040841`
2. A pairing code will be provided to link your WhatsApp

## Compatibility Shims

The obfuscated source code references `@adiwajshing/baileys` (older package name) and `@library/wawebjs`. Both are shimmed in `node_modules/` to forward to the installed `@whiskeysockets/baileys` v7, with a `makeInMemoryStore` compatibility layer.

## Notes on Deobfuscation

`main.js`, `config.js`, and `settings.js` use a custom runtime cipher obfuscation — webcrack partially cleaned the structure but could not decode the string table. Bot name, channel links, and other strings hardcoded inside those files cannot be directly edited without a full runtime deobfuscation.

Partially deobfuscated copies are at `main_cracked/`, `config_cracked/`, `settings_cracked/`.

## User Preferences

- Package manager: npm
- Node version: 20
