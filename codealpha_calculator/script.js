/**
 * ==========================================================================
 * CodeAlpha Calculator - Main JavaScript Application
 * Task: CodeAlpha Web Development Internship – Task 2
 * Author: Rakzana
 * Technologies: HTML5, CSS3, Vanilla JavaScript (No external libraries, No eval)
 * ==========================================================================
 */

// Encapsulate calculator in an IIFE or clean Class/Object structure
document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --------------------------------------------------------------------------
     1. DOM Element Selectors
     -------------------------------------------------------------------------- */
  const previousOperandTextElement = document.getElementById('previous-operand');
  const currentOperandTextElement = document.getElementById('current-operand');
  
  const numberButtons = document.querySelectorAll('[data-number]');
  const operationButtons = document.querySelectorAll('[data-operation]');
  const equalsButton = document.querySelector('[data-action="calculate"]');
  const deleteButton = document.querySelector('[data-action="delete"]');
  const clearButton = document.querySelector('[data-action="clear"]');

  // Theme Selectors
  const themeToggleBtn = document.getElementById('theme-btn');
  const themeModal = document.getElementById('theme-modal');
  const themeCloseBtn = document.getElementById('theme-close-btn');
  const themeOptions = document.querySelectorAll('.theme-option');

  /* --------------------------------------------------------------------------
     2. Calculator State Management Class
     -------------------------------------------------------------------------- */
  class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
      this.previousOperandElement = previousOperandElement;
      this.currentOperandElement = currentOperandElement;
      this.clear();
    }

    /**
     * Resets calculator state to initial default values
     */
    clear() {
      this.currentOperand = '0';
      this.previousOperand = '';
      this.operation = undefined;
      this.shouldResetScreen = false;
      this.isErrorState = false;
    }

    /**
     * Deletes the last entered character from current input
     */
    delete() {
      if (this.isErrorState) {
        this.clear();
        return;
      }

      if (this.shouldResetScreen) {
        this.clear();
        return;
      }

      // If only one digit or empty, reset to 0
      if (this.currentOperand.length <= 1 || (this.currentOperand.length === 2 && this.currentOperand.startsWith('-'))) {
        this.currentOperand = '0';
      } else {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
      }
    }

    /**
     * Appends a digit or decimal point to the current operand
     * @param {string} number - The digit or '.' to append
     */
    appendNumber(number) {
      // If returning from an error or computation, start fresh
      if (this.isErrorState || this.shouldResetScreen) {
        this.currentOperand = (number === '.') ? '0.' : '';
        this.shouldResetScreen = false;
        this.isErrorState = false;
      }

      // Prevent multiple decimals
      if (number === '.' && this.currentOperand.includes('.')) {
        return;
      }

      // If current is '0' and typing a non-decimal number, replace '0'
      if (this.currentOperand === '0' && number !== '.') {
        this.currentOperand = number.toString();
        return;
      }

      // Max input length guard to keep display clean and prevent overflow
      if (this.currentOperand.replace(/[^0-9]/g, '').length >= 14 && number !== '.') {
        return;
      }

      this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    /**
     * Selects an arithmetic operation (+, −, ×, ÷)
     * @param {string} operation - The operator symbol
     */
    chooseOperation(operation) {
      if (this.isErrorState) return;

      // If current is empty but we have a previous operand, allow changing the operator
      if (this.currentOperand === '' && this.previousOperand !== '') {
        this.operation = operation;
        return;
      }

      // If chaining calculations (e.g. 5 + 5 + 5), compute previous step first
      if (this.previousOperand !== '' && this.currentOperand !== '') {
        this.compute();
        if (this.isErrorState) return;
      }

      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
      this.shouldResetScreen = false;
    }

    /**
     * Safely calculates the result of the arithmetic expression without eval()
     */
    compute() {
      let computation;
      const prev = parseFloat(this.previousOperand);
      const current = parseFloat(this.currentOperand);

      // Require both numbers to compute
      if (isNaN(prev) || isNaN(current)) return;

      switch (this.operation) {
        case '+':
          computation = prev + current;
          break;
        case '−':
        case '-':
          computation = prev - current;
          break;
        case '×':
        case '*':
          computation = prev * current;
          break;
        case '÷':
        case '/':
          // Handle Division by Zero
          if (current === 0) {
            this.currentOperand = 'Cannot divide by 0';
            this.previousOperand = '';
            this.operation = undefined;
            this.isErrorState = true;
            this.shouldResetScreen = true;
            return;
          }
          computation = prev / current;
          break;
        default:
          return;
      }

      // Format floating point result to eliminate precision artifacts (e.g., 0.1 + 0.2 = 0.3)
      this.currentOperand = this.formatSafeNumber(computation);
      this.operation = undefined;
      this.previousOperand = '';
      this.shouldResetScreen = true;
    }

    /**
     * Cleans up floating point precision issues and formats numbers
     * @param {number} num 
     * @returns {string}
     */
    formatSafeNumber(num) {
      if (!isFinite(num)) {
        this.isErrorState = true;
        return 'Error';
      }

      // Round to 10 decimal places to eliminate floating point glitches
      const rounded = parseFloat(num.toPrecision(12));
      return rounded.toString();
    }

    /**
     * Formats number string with commas for display
     * @param {string} numberStr 
     * @returns {string}
     */
    getDisplayNumber(numberStr) {
      if (numberStr === '' || numberStr === undefined || numberStr === null) return '';
      if (numberStr === 'Cannot divide by 0' || numberStr === 'Error') return numberStr;

      const stringNumber = numberStr.toString();
      const isNegative = stringNumber.startsWith('-');
      const cleanNumber = isNegative ? stringNumber.substring(1) : stringNumber;
      
      const integerDigits = parseFloat(cleanNumber.split('.')[0]);
      const decimalDigits = cleanNumber.split('.')[1];

      let integerDisplay;
      if (isNaN(integerDigits)) {
        integerDisplay = '';
      } else {
        integerDisplay = integerDigits.toLocaleString('en-US', { maximumFractionDigits: 0 });
      }

      const sign = isNegative ? '-' : '';

      if (decimalDigits != null) {
        return `${sign}${integerDisplay}.${decimalDigits}`;
      } else {
        return `${sign}${integerDisplay}`;
      }
    }

    /**
     * Updates the UI display elements and applies responsive text sizing
     */
    updateDisplay() {
      if (this.isErrorState) {
        this.currentOperandElement.innerText = this.currentOperand;
        this.currentOperandElement.classList.add('error-text');
        this.previousOperandElement.innerHTML = '&nbsp;';
        return;
      }

      this.currentOperandElement.classList.remove('error-text');
      
      // Update main operand display
      const formattedCurrent = this.getDisplayNumber(this.currentOperand);
      this.currentOperandElement.innerText = formattedCurrent || '0';

      // Adjust font size based on length of digits
      const length = (formattedCurrent || '').length;
      if (length > 12) {
        this.currentOperandElement.className = 'current-operand font-small';
      } else if (length > 8) {
        this.currentOperandElement.className = 'current-operand font-medium';
      } else {
        this.currentOperandElement.className = 'current-operand';
      }

      // Update previous calculation history display
      if (this.operation != null) {
        this.previousOperandElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
      } else {
        this.previousOperandElement.innerHTML = '&nbsp;';
      }
    }
  }

  /* --------------------------------------------------------------------------
     3. Instantiate Calculator
     -------------------------------------------------------------------------- */
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);
  calculator.updateDisplay();

  /* --------------------------------------------------------------------------
     4. Button Event Listeners
     -------------------------------------------------------------------------- */

  // Number & Decimal Buttons
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.getAttribute('data-number'));
      calculator.updateDisplay();
    });
  });

  // Operator Buttons (+, −, ×, ÷)
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.getAttribute('data-operation'));
      calculator.updateDisplay();
    });
  });

  // Equals Button (=)
  if (equalsButton) {
    equalsButton.addEventListener('click', () => {
      calculator.compute();
      calculator.updateDisplay();
    });
  }

  // Clear Button (C)
  if (clearButton) {
    clearButton.addEventListener('click', () => {
      calculator.clear();
      calculator.updateDisplay();
    });
  }

  // Delete / Backspace Button (⌫)
  if (deleteButton) {
    deleteButton.addEventListener('click', () => {
      calculator.delete();
      calculator.updateDisplay();
    });
  }

  /* --------------------------------------------------------------------------
     5. Keyboard Event Handling & Tactile Visual Feedback
     -------------------------------------------------------------------------- */
  
  /**
   * Helper to trigger visual click animation on button matching keyboard input
   * @param {string} selector 
   */
  function triggerButtonAnimation(selector) {
    const btn = document.querySelector(selector);
    if (btn) {
      btn.classList.add('active-press');
      setTimeout(() => {
        btn.classList.remove('active-press');
      }, 140);
    }
  }

  window.addEventListener('keydown', (event) => {
    const { key } = event;

    // Numbers 0–9
    if (key >= '0' && key <= '9') {
      event.preventDefault();
      calculator.appendNumber(key);
      calculator.updateDisplay();
      triggerButtonAnimation(`[data-number="${key}"]`);
    }

    // Decimal Point (.)
    if (key === '.') {
      event.preventDefault();
      calculator.appendNumber('.');
      calculator.updateDisplay();
      triggerButtonAnimation('[data-number="."]');
    }

    // Addition (+)
    if (key === '+') {
      event.preventDefault();
      calculator.chooseOperation('+');
      calculator.updateDisplay();
      triggerButtonAnimation('[data-operation="+"]');
    }

    // Subtraction (-)
    if (key === '-') {
      event.preventDefault();
      calculator.chooseOperation('−');
      calculator.updateDisplay();
      triggerButtonAnimation('[data-operation="−"]');
    }

    // Multiplication (* or x or X)
    if (key === '*' || key.toLowerCase() === 'x') {
      event.preventDefault();
      calculator.chooseOperation('×');
      calculator.updateDisplay();
      triggerButtonAnimation('[data-operation="×"]');
    }

    // Division (/)
    if (key === '/') {
      event.preventDefault(); // Prevent browser quick-find
      calculator.chooseOperation('÷');
      calculator.updateDisplay();
      triggerButtonAnimation('[data-operation="÷"]');
    }

    // Equals (Enter or =)
    if (key === 'Enter' || key === '=') {
      event.preventDefault();
      calculator.compute();
      calculator.updateDisplay();
      triggerButtonAnimation('[data-action="calculate"]');
    }

    // Delete (Backspace)
    if (key === 'Backspace') {
      event.preventDefault();
      calculator.delete();
      calculator.updateDisplay();
      triggerButtonAnimation('[data-action="delete"]');
    }

    // Clear (Escape or 'c' or 'C')
    if (key === 'Escape' || key.toLowerCase() === 'c') {
      event.preventDefault();
      calculator.clear();
      calculator.updateDisplay();
      triggerButtonAnimation('[data-action="clear"]');
    }
  });

  /* --------------------------------------------------------------------------
     6. Theme Customization & LocalStorage Persistence
     -------------------------------------------------------------------------- */
  const THEME_STORAGE_KEY = 'codealpha_calculator_theme';
  const DEFAULT_THEME = 'purple';

  /**
   * Applies the requested theme across DOM & updates theme picker UI
   * @param {string} themeId 
   */
  function applyTheme(themeId) {
    const validThemes = ['purple', 'blue', 'pink', 'green', 'dark', 'light'];
    const activeTheme = validThemes.includes(themeId) ? themeId : DEFAULT_THEME;

    // Apply attribute to root html element
    document.documentElement.setAttribute('data-theme', activeTheme);

    // Save to localStorage
    try {
      localStorage.setItem(THEME_STORAGE_KEY, activeTheme);
    } catch (e) {
      console.warn('LocalStorage unavailable for theme persistence:', e);
    }

    // Update active radio states in theme options modal
    themeOptions.forEach(option => {
      const isSelected = option.getAttribute('data-theme-id') === activeTheme;
      option.classList.toggle('active', isSelected);
      option.setAttribute('aria-checked', isSelected.toString());
    });
  }

  /**
   * Initializes saved theme or default theme on page load
   */
  function initTheme() {
    let savedTheme = DEFAULT_THEME;
    try {
      savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || DEFAULT_THEME;
    } catch (e) {
      savedTheme = DEFAULT_THEME;
    }
    applyTheme(savedTheme);
  }

  // Toggle Theme Popover Modal
  function openThemeModal() {
    themeModal.removeAttribute('hidden');
    themeToggleBtn.setAttribute('aria-expanded', 'true');
  }

  function closeThemeModal() {
    themeModal.setAttribute('hidden', '');
    themeToggleBtn.setAttribute('aria-expanded', 'false');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = themeModal.hasAttribute('hidden');
      if (isHidden) {
        openThemeModal();
      } else {
        closeThemeModal();
      }
    });
  }

  if (themeCloseBtn) {
    themeCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeThemeModal();
    });
  }

  // Handle clicking on theme options
  themeOptions.forEach(option => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      const selectedTheme = option.getAttribute('data-theme-id');
      applyTheme(selectedTheme);
      closeThemeModal();
    });
  });

  // Close modal when clicking outside
  document.addEventListener('click', (e) => {
    if (!themeModal.hasAttribute('hidden') && !themeModal.contains(e.target) && e.target !== themeToggleBtn) {
      closeThemeModal();
    }
  });

  // Close modal on Escape key if open
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !themeModal.hasAttribute('hidden')) {
      closeThemeModal();
    }
  });

  // Initialize theme on start
  initTheme();
});
