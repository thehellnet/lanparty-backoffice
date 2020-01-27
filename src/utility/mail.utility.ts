export class MailUtility {
    private static mailRegex: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    public static validateAddress(email: string): boolean {
        if (email == '') {
            return false
        }

        return this.mailRegex.test(email)
    }
}
