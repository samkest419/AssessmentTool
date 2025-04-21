// Fix for localStorage state persistence issues
function enhancedSaveState() {
  try {
    // Create a deep copy of the state to avoid reference issues
    const stateCopy = JSON.parse(JSON.stringify(state));
    
    // Add timestamp for debugging
    stateCopy.lastSaved = new Date().toISOString();
    
    // Save to localStorage with error handling
    localStorage.setItem('assessmentState', JSON.stringify(stateCopy));
    
    // Log success for debugging
    console.log('State saved successfully:', stateCopy);
    
    // Verify save was successful by reading it back
    const savedState = localStorage.getItem('assessmentState');
    if (!savedState) {
      console.error('State save verification failed: Item not found in localStorage');
    }
  } catch (error) {
    console.error('Error saving state to localStorage:', error);
    // Fallback to sessionStorage if localStorage fails
    try {
      sessionStorage.setItem('assessmentState', JSON.stringify(state));
      console.log('State saved to sessionStorage as fallback');
    } catch (fallbackError) {
      console.error('Fallback to sessionStorage also failed:', fallbackError);
    }
  }
}

// Enhanced load state function with better error handling
function enhancedLoadState() {
  try {
    // Try localStorage first
    const savedState = localStorage.getItem('assessmentState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      console.log('State loaded successfully from localStorage');
      return parsedState;
    }
    
    // Try sessionStorage as fallback
    const sessionState = sessionStorage.getItem('assessmentState');
    if (sessionState) {
      const parsedState = JSON.parse(sessionState);
      console.log('State loaded from sessionStorage fallback');
      return parsedState;
    }
    
    console.log('No saved state found in storage');
    return null;
  } catch (error) {
    console.error('Error loading state from storage:', error);
    return null;
  }
}

// Enhanced clear state function
function enhancedClearState() {
  try {
    localStorage.removeItem('assessmentState');
    sessionStorage.removeItem('assessmentState');
    console.log('State cleared from all storage');
  } catch (error) {
    console.error('Error clearing state from storage:', error);
  }
}

// Fix for authentication and sign-in functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get login and register buttons
  const loginBtn = document.querySelector('.nav-item.btn-secondary');
  const registerBtn = document.querySelector('.nav-item.btn-primary');
  
  // Add event listeners for authentication
  if (loginBtn) {
    loginBtn.addEventListener('click', function(e) {
      e.preventDefault();
      showAuthModal('login');
    });
  }
  
  if (registerBtn) {
    registerBtn.addEventListener('click', function(e) {
      e.preventDefault();
      showAuthModal('register');
    });
  }
  
  // Close modal when clicking outside
  document.addEventListener('click', function(e) {
    const modal = document.querySelector('.auth-modal');
    if (modal && e.target === modal) {
      modal.style.display = 'none';
    }
  });
});

// Function to show authentication modal
function showAuthModal(type) {
  // Remove existing modal if any
  const existingModal = document.querySelector('.auth-modal');
  if (existingModal) {
    existingModal.remove();
  }
  
  // Create modal
  const modal = document.createElement('div');
  modal.className = 'auth-modal';
  
  // Create modal content
  const modalContent = document.createElement('div');
  modalContent.className = 'auth-modal-content';
  
  // Create close button
  const closeBtn = document.createElement('span');
  closeBtn.className = 'close-btn';
  closeBtn.innerHTML = '&times;';
  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
  });
  
  // Create form
  const form = document.createElement('form');
  form.className = 'auth-form';
  
  // Create title
  const title = document.createElement('h2');
  title.textContent = type === 'login' ? 'Login' : 'Register';
  
  // Create email field
  const emailGroup = document.createElement('div');
  emailGroup.className = 'form-group';
  
  const emailLabel = document.createElement('label');
  emailLabel.setAttribute('for', 'email');
  emailLabel.textContent = 'Email';
  
  const emailInput = document.createElement('input');
  emailInput.setAttribute('type', 'email');
  emailInput.setAttribute('id', 'email');
  emailInput.setAttribute('required', 'true');
  
  emailGroup.appendChild(emailLabel);
  emailGroup.appendChild(emailInput);
  
  // Create password field
  const passwordGroup = document.createElement('div');
  passwordGroup.className = 'form-group';
  
  const passwordLabel = document.createElement('label');
  passwordLabel.setAttribute('for', 'password');
  passwordLabel.textContent = 'Password';
  
  const passwordInput = document.createElement('input');
  passwordInput.setAttribute('type', 'password');
  passwordInput.setAttribute('id', 'password');
  passwordInput.setAttribute('required', 'true');
  
  passwordGroup.appendChild(passwordLabel);
  passwordGroup.appendChild(passwordInput);
  
  // Create submit button
  const submitBtn = document.createElement('button');
  submitBtn.setAttribute('type', 'submit');
  submitBtn.className = 'btn btn-primary';
  submitBtn.textContent = type === 'login' ? 'Login' : 'Register';
  
  // Add event listener to form
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const email = emailInput.value;
    const password = passwordInput.value;
    
    // Simulate authentication (in a real app, this would call an API)
    if (type === 'login') {
      // Simulate successful login
      console.log('Login successful for:', email);
      
      // Store user info in localStorage
      localStorage.setItem('currentUser', JSON.stringify({
        email: email,
        loggedIn: true,
        lastLogin: new Date().toISOString()
      }));
      
      // Update UI to show logged in state
      updateAuthUI(email);
      
      // Close modal
      modal.style.display = 'none';
      
      // Show success message
      showMessage('Login successful!', 'success');
    } else {
      // Simulate successful registration
      console.log('Registration successful for:', email);
      
      // Store user info in localStorage
      localStorage.setItem('currentUser', JSON.stringify({
        email: email,
        loggedIn: true,
        registered: true,
        registrationDate: new Date().toISOString()
      }));
      
      // Update UI to show logged in state
      updateAuthUI(email);
      
      // Close modal
      modal.style.display = 'none';
      
      // Show success message
      showMessage('Registration successful!', 'success');
    }
  });
  
  // Assemble form
  form.appendChild(title);
  form.appendChild(emailGroup);
  form.appendChild(passwordGroup);
  form.appendChild(submitBtn);
  
  // Assemble modal
  modalContent.appendChild(closeBtn);
  modalContent.appendChild(form);
  modal.appendChild(modalContent);
  
  // Add modal to body
  document.body.appendChild(modal);
  
  // Show modal
  modal.style.display = 'block';
}

// Function to update UI after authentication
function updateAuthUI(email) {
  // Get nav elements
  const loginBtn = document.querySelector('.nav-item.btn-secondary');
  const registerBtn = document.querySelector('.nav-item.btn-primary');
  
  if (loginBtn && registerBtn) {
    // Remove existing buttons
    loginBtn.remove();
    registerBtn.remove();
    
    // Get nav container
    const nav = document.querySelector('.nav');
    
    // Create user info element
    const userInfo = document.createElement('div');
    userInfo.className = 'user-info';
    userInfo.textContent = email;
    
    // Create logout button
    const logoutBtn = document.createElement('a');
    logoutBtn.href = '#';
    logoutBtn.className = 'btn btn-secondary nav-item';
    logoutBtn.textContent = 'Logout';
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Clear user info from localStorage
      localStorage.removeItem('currentUser');
      
      // Reload page to reset UI
      window.location.reload();
    });
    
    // Add elements to nav
    nav.appendChild(userInfo);
    nav.appendChild(logoutBtn);
  }
}

// Function to show messages
function showMessage(message, type) {
  // Create message element
  const messageElement = document.createElement('div');
  messageElement.className = `message ${type}`;
  messageElement.textContent = message;
  
  // Add to body
  document.body.appendChild(messageElement);
  
  // Auto-hide after 3 seconds
  setTimeout(function() {
    messageElement.remove();
  }, 3000);
}

// Fix for selection registration issues
function enhancedOptionClickHandler(option) {
  const question = option.getAttribute('data-question');
  const value = option.getAttribute('data-value');
  
  console.log(`Option clicked: ${question} = ${value}`);
  
  // Remove selected class from all options in this question group
  document.querySelectorAll(`.option[data-question="${question}"]`).forEach(opt => {
    opt.classList.remove('selected');
  });
  
  // Add selected class to this option
  option.classList.add('selected');
  
  // Save the answer with enhanced state management
  state.answers[question] = value;
  console.log(`State updated: ${question} = ${value}`);
  
  // Use enhanced save state function
  enhancedSaveState();
  
  // Handle conditional questions
  handleConditionalQuestions(question, value);
  
  // Provide visual feedback
  option.style.transition = 'background-color 0.3s ease';
  const originalBackground = window.getComputedStyle(option).backgroundColor;
  option.style.backgroundColor = 'rgba(54, 162, 235, 0.2)';
  setTimeout(() => {
    option.style.backgroundColor = originalBackground;
  }, 300);
}

// Check for existing user on page load
document.addEventListener('DOMContentLoaded', function() {
  // Check if user is logged in
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    try {
      const user = JSON.parse(currentUser);
      if (user && user.loggedIn && user.email) {
        // Update UI to show logged in state
        updateAuthUI(user.email);
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  }
  
  // Replace existing state management functions
  window.saveState = enhancedSaveState;
  window.loadState = enhancedLoadState;
  window.clearState = enhancedClearState;
  
  // Re-attach event listeners to all option elements
  document.querySelectorAll('.option').forEach(option => {
    // Remove existing event listeners (not perfect but helps avoid duplicates)
    const optionClone = option.cloneNode(true);
    option.parentNode.replaceChild(optionClone, option);
    
    // Add enhanced event listener
    optionClone.addEventListener('click', function() {
      enhancedOptionClickHandler(this);
    });
  });
});
