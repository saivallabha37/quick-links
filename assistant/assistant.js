/**
 * =====================================================
 * QUICK LINKS — AI BUILD ASSISTANT CONTROLLER
 * Tabbed Results Layout & Fixed Architecture Sidebar
 * =====================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // DOM Elements
    const promptInput = document.getElementById('promptInput');
    const generateBtn = document.getElementById('generateBtn');
    const clearBtn = document.getElementById('clearBtn');
    const chipButtons = document.querySelectorAll('.chip');

    // Results Navbar & Tab Panes
    const resTabs = document.querySelectorAll('.res-tab');
    const tabPanes = document.querySelectorAll('.tab-pane');

    // Processing & Error
    const loadingState = document.getElementById('loadingState');
    const loadingStepTitle = document.getElementById('loadingStepTitle');
    const loadingStepSub = document.getElementById('loadingStepSub');
    const progressBar = document.getElementById('progressBar');
    const dot1 = document.getElementById('dot1');
    const dot2 = document.getElementById('dot2');
    const dot3 = document.getElementById('dot3');
    const dot4 = document.getElementById('dot4');

    const errorState = document.getElementById('errorState');
    const errorMsgText = document.getElementById('errorMsgText');
    const dismissErrorBtn = document.getElementById('dismissErrorBtn');

    // Results Container
    const resultsContainer = document.getElementById('resultsContainer');
    const fallbackNotice = document.getElementById('fallbackNotice');
    const fallbackNoticeText = document.getElementById('fallbackNoticeText');

    // Content Containers
    const stackGrid = document.getElementById('stackGrid');
    const matchedToolsGrid = document.getElementById('matchedToolsGrid');
    const workflowTimeline = document.getElementById('workflowTimeline');
    const resultCodingPrompt = document.getElementById('resultCodingPrompt');
    const copyPromptBtn = document.getElementById('copyPromptBtn');
    const copyBtnText = document.getElementById('copyBtnText');

    // Right Sidebar Overview
    const resultSummary = document.getElementById('resultSummary');
    const resultArchitecture = document.getElementById('resultArchitecture');
    const nextStepsList = document.getElementById('nextStepsList');

    let activeTabId = 'stack';
    let progressTimer = null;
    let isSubmitting = false;

    // Results Tab Switching
    resTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            switchTab(targetTab);
        });
    });

    function switchTab(tabName) {
        activeTabId = tabName;

        // Update tabs
        resTabs.forEach(t => {
            const isActive = t.dataset.tab === tabName;
            t.classList.toggle('active', isActive);
            t.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        // Update panes
        tabPanes.forEach(pane => {
            const paneId = pane.id.toLowerCase();
            const shouldShow = 
                (tabName === 'stack' && paneId === 'panestack') ||
                (tabName === 'tools' && paneId === 'panetools') ||
                (tabName === 'workflow' && paneId === 'paneworkflow') ||
                (tabName === 'prompt' && paneId === 'paneprompt');

            pane.classList.toggle('active', shouldShow);
        });
    }

    // Example Idea Chips
    chipButtons.forEach(chip => {
        chip.addEventListener('click', () => {
            const promptText = chip.dataset.prompt;
            if (promptText) {
                promptInput.value = promptText;
                promptInput.focus();
                hideError();
            }
        });
    });

    // Clear Button
    clearBtn.addEventListener('click', () => {
        promptInput.value = '';
        promptInput.focus();
        hideError();
    });

    // Dismiss Error
    dismissErrorBtn.addEventListener('click', hideError);

    function showError(msg) {
        errorMsgText.textContent = msg || 'Something went wrong. Please try again.';
        errorState.classList.remove('hidden');
    }

    function hideError() {
        errorState.classList.add('hidden');
    }

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl + Enter or Cmd + Enter to generate
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            triggerGenerate();
        }
        // Esc to clear input or hide errors
        if (e.key === 'Escape') {
            if (!errorState.classList.contains('hidden')) {
                hideError();
            } else if (document.activeElement === promptInput) {
                promptInput.value = '';
            }
        }
    });

    generateBtn.addEventListener('click', triggerGenerate);

    // Multi-stage loading progress
    const steps = [
        { title: "Analyzing your idea...", sub: "Evaluating technical requirements and architectural trade-offs", pct: 25, activeDot: 1 },
        { title: "Choosing the right architecture...", sub: "Determining optimal frontend, backend, and data patterns", pct: 50, activeDot: 2 },
        { title: "Matching tools from your toolbox...", sub: "Cross-referencing against verified Quick Links database", pct: 75, activeDot: 3 },
        { title: "Building your workflow & prompt...", sub: "Generating ready-to-use coding instructions and next steps", pct: 90, activeDot: 4 }
    ];

    function startLoading() {
        isSubmitting = true;
        generateBtn.disabled = true;
        generateBtn.classList.add('loading');
        loadingState.classList.remove('hidden');
        resultsContainer.classList.add('hidden');
        hideError();

        let stepIndex = 0;
        updateLoadingUI(steps[0]);

        if (progressTimer) clearInterval(progressTimer);
        progressTimer = setInterval(() => {
            stepIndex++;
            if (stepIndex < steps.length) {
                updateLoadingUI(steps[stepIndex]);
            }
        }, 800);
    }

    function updateLoadingUI(step) {
        loadingStepTitle.textContent = step.title;
        loadingStepSub.textContent = step.sub;
        progressBar.style.width = `${step.pct}%`;

        [dot1, dot2, dot3, dot4].forEach((dot, idx) => {
            if (idx + 1 <= step.activeDot) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function stopLoading() {
        if (progressTimer) {
            clearInterval(progressTimer);
            progressTimer = null;
        }
        progressBar.style.width = '100%';
        [dot1, dot2, dot3, dot4].forEach(dot => dot.classList.add('active'));

        setTimeout(() => {
            loadingState.classList.add('hidden');
            generateBtn.disabled = false;
            generateBtn.classList.remove('loading');
            isSubmitting = false;
        }, 200);
    }

    // Trigger API Generation
    async function triggerGenerate() {
        if (isSubmitting) return;

        const description = promptInput.value.trim();
        if (!description) {
            showError("Tell me what you want to build first.");
            promptInput.focus();
            return;
        }

        startLoading();

        try {
            const response = await fetch('/api/assistant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    description: description,
                    mode: activeTabId
                })
            });

            if (!response.ok) {
                let errText = "Something went wrong. Please try again.";
                try {
                    const errJson = await response.json();
                    if (errJson && errJson.error) errText = errJson.error;
                } catch (e) {}

                if (response.status === 429) {
                    showError("Too many requests. Please wait a moment.");
                } else {
                    showError(errText);
                }
                stopLoading();
                return;
            }

            const data = await response.json();
            stopLoading();
            renderResults(data);

        } catch (err) {
            console.error('Request failed:', err);
            stopLoading();
            showError("Network connection error. Please ensure the local server is running.");
        }
    }

    // Render results into UI
    function renderResults(data) {
        if (!data) return;

        // Fallback Notice
        if (data.isFallbackNotice) {
            fallbackNotice.classList.remove('hidden');
            fallbackNoticeText.textContent = data.isFallbackNotice;
        } else {
            fallbackNotice.classList.add('hidden');
        }

        // 1. Right Pane Summary & Architecture
        resultSummary.textContent = data.summary || "Architecture recommendation based on your requirements.";
        resultArchitecture.textContent = data.architecture || "Modern, modular architecture designed for high maintainability.";

        // 2. Right Pane Next Steps
        nextStepsList.innerHTML = '';
        if (Array.isArray(data.nextSteps) && data.nextSteps.length > 0) {
            data.nextSteps.forEach((step, idx) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span class="next-step-number">${idx + 1}</span>
                    <span>${escapeHtml(step)}</span>
                `;
                nextStepsList.appendChild(li);
            });
        }

        // 3. Tab Pane A: Recommended Stack
        stackGrid.innerHTML = '';
        if (Array.isArray(data.recommendedStack) && data.recommendedStack.length > 0) {
            data.recommendedStack.forEach(item => {
                const el = document.createElement('div');
                el.className = 'stack-item';
                el.innerHTML = `
                    <span class="stack-category">${escapeHtml(item.category || 'Stack Component')}</span>
                    <h4 class="stack-name">${escapeHtml(item.name || '')}</h4>
                    <p class="stack-reason">${escapeHtml(item.reason || '')}</p>
                `;
                stackGrid.appendChild(el);
            });
        }

        // 4. Tab Pane B: Matched Toolbox Tools (with Deep Reasons)
        matchedToolsGrid.innerHTML = '';
        if (Array.isArray(data.matchedTools) && data.matchedTools.length > 0) {
            data.matchedTools.forEach(tool => {
                let canonical = null;
                if (window.resources && Array.isArray(window.resources)) {
                    canonical = window.resources.find(r => r.name.toLowerCase() === (tool.name || '').toLowerCase());
                }

                const name = canonical ? canonical.name : tool.name;
                const url = canonical ? canonical.url : (tool.url || '#');
                const icon = canonical ? canonical.icon : (tool.icon || '⚡');
                const tag = canonical ? canonical.tag : (tool.tag || 'TOOL');
                const worksWith = (canonical ? canonical.worksWith : tool.worksWith) || [];
                const reason = tool.reason || (canonical ? canonical.useWhen : '');

                const card = document.createElement('article');
                card.className = 'tool-match-card';
                card.innerHTML = `
                    <div>
                        <div class="tool-match-top">
                            <div class="tool-match-logo">${escapeHtml(icon)}</div>
                            <span class="tool-match-tag">${escapeHtml(tag)}</span>
                        </div>
                        <h4>${escapeHtml(name)}</h4>
                        <p class="tool-match-reason">${escapeHtml(reason)}</p>
                    </div>
                    <div class="tool-match-footer">
                        <div class="tool-match-works-with">
                            ${worksWith.map(w => `<span>${escapeHtml(w)}</span>`).join('')}
                        </div>
                        <a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" class="tool-match-link">
                            Open ↗
                        </a>
                    </div>
                `;
                matchedToolsGrid.appendChild(card);
            });
        } else {
            matchedToolsGrid.innerHTML = `<p style="color:#717583; font-size:13px;">No direct toolbox matches found for this specific query.</p>`;
        }

        // 5. Tab Pane C: Workflow Timeline (Expanded phases)
        workflowTimeline.innerHTML = '';
        if (Array.isArray(data.workflow) && data.workflow.length > 0) {
            data.workflow.forEach((step, idx) => {
                const el = document.createElement('div');
                el.className = 'workflow-step-item';
                
                let stepBadgeText = `0${idx + 1}`;
                let stepTextContent = step;
                if (step.includes('→')) {
                    const parts = step.split('→');
                    stepBadgeText = parts[0].trim();
                    stepTextContent = parts.slice(1).join('→').trim();
                }

                el.innerHTML = `
                    <div class="step-badge">${escapeHtml(stepBadgeText)}</div>
                    <div class="step-text">${escapeHtml(stepTextContent)}</div>
                `;
                workflowTimeline.appendChild(el);
            });
        }

        // 6. Tab Pane D: Full-Length Coding Prompt
        resultCodingPrompt.textContent = data.codingPrompt || 'No coding prompt generated.';

        // Display results container
        resultsContainer.classList.remove('hidden');

        // Make sure active tab is selected and pane is visible
        switchTab(activeTabId);

        // Smooth scroll to results
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Copy Prompt Functionality
    copyPromptBtn.addEventListener('click', async () => {
        const textToCopy = resultCodingPrompt.textContent;
        if (!textToCopy) return;

        try {
            await navigator.clipboard.writeText(textToCopy);
            copyPromptBtn.classList.add('copied');
            copyBtnText.textContent = 'Copied ✓';
            setTimeout(() => {
                copyPromptBtn.classList.remove('copied');
                copyBtnText.textContent = 'Copy Prompt';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy to clipboard:', err);
            const range = document.createRange();
            range.selectNodeContents(resultCodingPrompt);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand('copy');
            copyPromptBtn.classList.add('copied');
            copyBtnText.textContent = 'Copied ✓';
            setTimeout(() => {
                copyPromptBtn.classList.remove('copied');
                copyBtnText.textContent = 'Copy Prompt';
            }, 2000);
        }
    });

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
});
