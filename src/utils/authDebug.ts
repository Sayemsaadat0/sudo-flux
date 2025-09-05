// Utility functions to debug authentication persistence

export const debugAuthStorage = () => {
  if (typeof window === 'undefined') {
    console.log('🔍 Auth Debug: Running on server side');
    return;
  }

  const storageKey = 'auth-storage';
  const storedData = localStorage.getItem(storageKey);
  
  console.log('🔍 Auth Debug Information:');
  console.log('📦 Storage Key:', storageKey);
  console.log('💾 Stored Data:', storedData);
  
  if (storedData) {
    try {
      const parsed = JSON.parse(storedData);
      console.log('✅ Parsed Data:', parsed);
      console.log('👤 Has User:', !!parsed.state?.user);
      console.log('🔑 Has Token:', !!parsed.state?.user?.token);
    } catch (error) {
      console.error('❌ Error parsing stored data:', error);
    }
  } else {
    console.log('❌ No stored data found');
  }
};

export const clearAuthStorage = () => {
  if (typeof window === 'undefined') {
    console.log('🔍 Clear Auth: Running on server side');
    return;
  }

  const storageKey = 'auth-storage';
  localStorage.removeItem(storageKey);
  console.log('🗑️ Cleared auth storage');
};

export const testAuthPersistence = () => {
  if (typeof window === 'undefined') {
    console.log('🔍 Test Auth: Running on server side');
    return;
  }

  console.log('🧪 Testing Auth Persistence...');
  
  // Check if data exists
  const storageKey = 'auth-storage';
  const storedData = localStorage.getItem(storageKey);
  
  if (storedData) {
    console.log('✅ Auth data found in localStorage');
    console.log('📊 Data size:', storedData.length, 'characters');
    
    try {
      const parsed = JSON.parse(storedData);
      const hasUser = !!parsed.state?.user;
      const hasToken = !!parsed.state?.user?.token;
      
      console.log('🔍 Persistence Status:');
      console.log('  - User:', hasUser ? '✅' : '❌');
      console.log('  - Token:', hasToken ? '✅' : '❌');
      
      if (hasUser && hasToken) {
        console.log('🎉 Auth persistence is working correctly!');
      } else {
        console.log('⚠️ Auth persistence has issues');
      }
    } catch (error) {
      console.error('❌ Error parsing auth data:', error);
    }
  } else {
    console.log('❌ No auth data found in localStorage');
  }
};

// Make functions available globally for debugging
if (typeof window !== 'undefined') {
  (window as any).debugAuth = {
    debug: debugAuthStorage,
    clear: clearAuthStorage,
    test: testAuthPersistence,
  };
}
