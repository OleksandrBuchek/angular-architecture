export const toFixed =
  (fractionDigits = 2) =>
  (value: string | number | undefined | null): number | null => {
    const formattedValue = String(value).split(' ').join('');

    if (
      String(value).includes('.') &&
      String(value).split('.').length === fractionDigits
    ) {
      const decimal = String(value).split('.')[1]?.length;
      if (decimal && decimal > fractionDigits) {
        return Number(parseFloat(formattedValue).toFixed(fractionDigits));
      }
    }

    return formattedValue ? Number(formattedValue) : null;
  };
