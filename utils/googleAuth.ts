// Google JWT token decoder and user data extractor
export interface GoogleUserData {
  id: string;
  email: string;
  name: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
  email_verified?: boolean;
}

/**
 * Decode Google JWT token (без верификации - только для клиентской стороны)
 * В продакшене нужно верифицировать токен на бэкенде
 */
export function decodeGoogleJWT(token: string): GoogleUserData | null {
  try {
    // JWT состоит из трех частей, разделенных точками
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format');
    }

    // Декодируем payload (средняя часть)
    const payload = parts[1];
    // Добавляем padding если нужно для base64
    const paddedPayload = payload + '='.repeat((4 - payload.length % 4) % 4);
    const decodedPayload = atob(paddedPayload);
    const userData = JSON.parse(decodedPayload);

    return {
      id: userData.sub,
      email: userData.email,
      name: userData.name,
      picture: userData.picture,
      given_name: userData.given_name,
      family_name: userData.family_name,
      email_verified: userData.email_verified
    };
  } catch (error) {
    console.error('Error decoding Google JWT:', error);
    return null;
  }
}

/**
 * Генерирует пользователя для LUMA на основе Google данных
 */
export function createLumaUserFromGoogle(googleUser: GoogleUserData, role: 'buyer' | 'seller' = 'buyer') {
  return {
    id: Date.now(), // В реальном приложении будет из базы данных
    googleId: googleUser.id,
    name: googleUser.name,
    email: googleUser.email,
    picture: googleUser.picture,
    role: role,
    emailVerified: googleUser.email_verified || false,
    authProvider: 'google',
    createdAt: new Date().toISOString()
  };
}

/**
 * Сохраняет Google токен в localStorage (для демо)
 * В продакшене используйте secure cookies или другое безопасное хранилище
 */
export function saveGoogleToken(token: string) {
  try {
    localStorage.setItem('luma_google_token', token);
    localStorage.setItem('luma_google_token_time', Date.now().toString());
  } catch (error) {
    console.error('Failed to save Google token:', error);
  }
}

/**
 * Получает сохраненный Google токен
 */
export function getGoogleToken(): string | null {
  try {
    const token = localStorage.getItem('luma_google_token');
    const tokenTime = localStorage.getItem('luma_google_token_time');
    
    // Проверяем, не истек ли токен (Google JWT обычно действительны 1 час)
    if (token && tokenTime) {
      const tokenAge = Date.now() - parseInt(tokenTime);
      const oneHour = 60 * 60 * 1000;
      
      if (tokenAge < oneHour) {
        return token;
      } else {
        // Токен истек, удаляем его
        clearGoogleToken();
        return null;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Failed to get Google token:', error);
    return null;
  }
}

/**
 * Удаляет Google токен
 */
export function clearGoogleToken() {
  try {
    localStorage.removeItem('luma_google_token');
    localStorage.removeItem('luma_google_token_time');
  } catch (error) {
    console.error('Failed to clear Google token:', error);
  }
}

/**
 * Проверяет, авторизован ли пользователь через Google
 */
export function isGoogleAuthenticated(): boolean {
  return getGoogleToken() !== null;
}