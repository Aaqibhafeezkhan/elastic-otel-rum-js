/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {test, expect} from '@playwright/test';
import {createCollector} from './test-utils';

test('should disable instrumentations listed in disableInstrumentations', async ({
    page,
}) => {
    const collector = createCollector(page);
    const config = encodeURIComponent(
        JSON.stringify({
            disableInstrumentations: ['resource-timing'],
        })
    );
    await page.goto(`/fixtures/use-navigation-timing.html?config=${config}`);

    const logs = await collector.getLogs();
    expect(logs.length).toBeGreaterThan(0);

    const timingLogs = logs.filter(
        (l) =>
            l.scope.name ===
            '@opentelemetry/browser-instrumentation/resource-timing'
    );
    expect(timingLogs.length).toBe(0);
});

test('should continue supporting the deprecated per-instrumentation enabled option', async ({
    page,
}) => {
    const warnings = [];
    page.on('console', (message) => warnings.push(message.text()));

    const collector = createCollector(page);
    const config = encodeURIComponent(
        JSON.stringify({
            instrumentations: {
                'resource-timing': {enabled: false},
            },
        })
    );
    await page.goto(`/fixtures/use-navigation-timing.html?config=${config}`);

    const logs = await collector.getLogs();
    expect(logs.length).toBeGreaterThan(0);

    const timingLogs = logs.filter(
        (l) =>
            l.scope.name ===
            '@opentelemetry/browser-instrumentation/resource-timing'
    );
    expect(timingLogs.length).toBe(0);
    expect(
        warnings.some((message) =>
            message.includes('instrumentations.resource-timing.enabled')
        )
    ).toBe(true);
});
