/**
 * Validates if an object has empty fields
 * @param {Object} obj - The object to validate
 * @param {Object} options - Optional configuration
 * @param {boolean} options.allowZero - Whether to consider 0 as a valid value (default: true)
 * @param {boolean} options.allowFalse - Whether to consider false as a valid value (default: true)
 * @param {string[]} options.excludeFields - Array of field names to exclude from validation
 * @returns {Object} - Result object with validation details
 */
export const validateObject = (obj, options = {}) => {
    const { allowZero = true, allowFalse = true, excludeFields = [] } = options;

    // Initialize results
    const result = {
        isValid: true,
        emptyFields: [],
        errorDetails: {},
    };

    // Helper function to check if a value is empty
    const isEmpty = (value) => {
        // Handle different types of empty values
        if (value === undefined || value === null || value === "") {
            return true;
        }

        // Handle numbers
        if (typeof value === "number") {
            return !allowZero && value === 0;
        }

        // Handle booleans
        if (typeof value === "boolean") {
            return !allowFalse && value === false;
        }

        // Handle arrays
        if (Array.isArray(value)) {
            return value.length === 0;
        }

        // Handle objects
        if (typeof value === "object") {
            return Object.keys(value).length === 0;
        }

        // Handle strings with only whitespace
        if (typeof value === "string") {
            return value.trim().length === 0;
        }

        return false;
    };

    // Validate each field
    Object.entries(obj).forEach(([key, value]) => {
        // Skip excluded fields
        if (excludeFields.includes(key)) {
            return;
        }

        if (isEmpty(value)) {
            result.isValid = false;
            result.emptyFields.push(key);
            result.errorDetails[key] = {
                value,
                type: typeof value,
                message: `Field "${key}" is empty or invalid`,
            };
        }
    });

    return result;
};
