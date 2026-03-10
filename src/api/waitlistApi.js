const BASE_URL = import.meta.env.DEV ? import.meta.env.VITE_TEST_BASE_URL : import.meta.env.VITE_BASE_URL;
export const registerWaitlist = async (newWaitlistEntry) => {
    const response = await fetch(`${BASE_URL}/register/waitlist`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newWaitlistEntry),
    });

    if (!response.ok) {
        let errorMessage = 'Failed to register on waitlist';
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } catch (e) {
            // Failed to parse JSON error
        }
        throw new Error(errorMessage);
    }

    if (response.status === 201 || response.status === 204) {
        return { success: true };
    }

    try {
        return await response.json();
    } catch (e) {
        // If response is a 201 or 200 without a JSON body, don't fail
        return { success: true };
    }
};
