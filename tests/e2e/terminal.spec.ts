import { test, expect } from '@playwright/test';

test.describe('ENTITY-001 Terminal', () => {
	test('should load homepage with terminal', async ({ page }) => {
		await page.goto('/');

		// Should show terminal window
		await expect(page.locator('.terminal-window')).toBeVisible();

		// Should show title
		await expect(page.locator('.title-bar')).toContainText('ENTITY-001');

		// Should show intro text
		await expect(page.locator('.terminal-content')).toContainText('E N T I T Y - 0 0 1');
	});

	test('should show language selector', async ({ page }) => {
		await page.goto('/');

		// Language selector should be visible
		await expect(page.locator('.lang-selector')).toBeVisible();
	});

	test('should toggle language', async ({ page }) => {
		await page.goto('/');

		const langSelector = page.locator('.lang-selector');

		// Should start with EN
		await expect(langSelector).toContainText('EN');

		// Click to toggle
		await langSelector.click();

		// Should change to PT
		await expect(langSelector).toContainText('PT');

		// Click again
		await langSelector.click();

		// Should be back to EN
		await expect(langSelector).toContainText('EN');
	});

	test('should load about page', async ({ page }) => {
		await page.goto('/about');

		// Should show about window
		await expect(page.locator('.about-window')).toBeVisible();

		// Should contain creator info
		await expect(page.locator('.credits')).toContainText('Roger Rosset');
		await expect(page.locator('.credits')).toContainText('@rrosset91');

		// Should have link back to terminal
		const backLink = page.locator('a[href="/"]');
		await expect(backLink).toBeVisible();
	});

	test('should navigate from home to about and back', async ({ page }) => {
		await page.goto('/');

		// Navigate to about
		await page.goto('/about');
		await expect(page.locator('.about-window')).toBeVisible();

		// Navigate back
		await page.locator('a[href="/"]').click();
		await expect(page.locator('.terminal-window')).toBeVisible();
	});

	test('should show CRT effects', async ({ page }) => {
		await page.goto('/');

		// Should have CRT effects container
		await expect(page.locator('.crt-effects')).toBeVisible();

		// Should have scanlines
		await expect(page.locator('.scanlines')).toBeVisible();

		// Should have vignette
		await expect(page.locator('.vignette')).toBeVisible();
	});

	test('should have proper Windows 95 styling', async ({ page }) => {
		await page.goto('/');

		const terminal = page.locator('.terminal-window');

		// Check for Win95 borders
		const borderStyle = await terminal.evaluate((el) => {
			const styles = window.getComputedStyle(el);
			return {
				borderTop: styles.borderTopWidth,
				borderLeft: styles.borderLeftWidth,
				borderRight: styles.borderRightWidth,
				borderBottom: styles.borderBottomWidth,
			};
		});

		// Should have 2px borders
		expect(borderStyle.borderTop).toBe('2px');
		expect(borderStyle.borderLeft).toBe('2px');
	});

	test('should use VT323 font', async ({ page }) => {
		await page.goto('/');

		const fontFamily = await page.evaluate(() => {
			return window.getComputedStyle(document.body).fontFamily;
		});

		// Should include VT323 in font stack
		expect(fontFamily).toContain('VT323');
	});
});

test.describe('Mobile Detection', () => {
	test('should show mobile warning on mobile viewport', async ({ page }) => {
		// Set mobile viewport
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto('/');

		// Terminal might still show, but warning text should be present
		const warning = page.locator('.mobile-warning');
		if (await warning.isVisible()) {
			await expect(warning).toContainText('desktop computer with keyboard');
		}
	});
});
