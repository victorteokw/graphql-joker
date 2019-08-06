#!/usr/bin/env node
import { Context } from 'scaffold-kit';
import nullExecutable from 'scaffold-kit/lib/nullExecutable';
import app from './app';

app(new Context({ wd: process.cwd(), args: [], options: {}}), nullExecutable);
