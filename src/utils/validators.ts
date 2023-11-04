function validateFileImageType(file: File): boolean {
    const imageFileRegex = /^image\/(png|jpeg|jpg|gif|bmp)$/;
    return imageFileRegex.test(file.type);
}

export { validateFileImageType };