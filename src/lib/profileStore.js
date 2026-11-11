/**
 * Saves the user's profile answers in this browser until a backend endpoint
 * exists. Swap these two functions for API calls when it does.
 */
const keyFor = (userId) => `tourain.profile.${userId}`;

export function loadProfile(userId) {
    if (!userId) return {};
    try {
        return JSON.parse(localStorage.getItem(keyFor(userId)) || '{}');
    } catch {
        return {};
    }
}

export function saveProfile(userId, profile) {
    if (!userId) return;
    try {
        localStorage.setItem(keyFor(userId), JSON.stringify(profile));
    } catch {
        /* storage unavailable */
    }
}

/** First name to greet the user with ("Welcome, Isaac"). */
export function displayName(user, profile) {
    if (profile?.givenName) return profile.givenName;
    if (user?.name) return user.name.trim().split(/\s+/)[0];
    const local = (user?.email || '').split('@')[0] || 'there';
    const first = local.split(/[._-]/)[0] || local;
    return first.charAt(0).toUpperCase() + first.slice(1);
}

/** Travel history answers (second part of the visa assessment), same storage approach. */
const travelKeyFor = (userId) => `tourain.travel.${userId}`;

export function loadTravel(userId) {
    if (!userId) return {};
    try {
        return JSON.parse(localStorage.getItem(travelKeyFor(userId)) || '{}');
    } catch {
        return {};
    }
}

export function saveTravel(userId, travel) {
    if (!userId) return;
    try {
        localStorage.setItem(travelKeyFor(userId), JSON.stringify(travel));
    } catch {
        /* storage unavailable */
    }
}
