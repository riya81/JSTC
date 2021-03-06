import acorn from "../../../type/type"
import { parse, Out } from "../../api/api"
/**
 * @module python
 * @param {acorn.Node} codes
 * @returns {acorn.OUT} 変換結果を出力
 */
export default function ruby ( codes: acorn.Node, mode: string ): acorn.OUT
{
    let out: acorn.OUT = Out.clean();
    return (
        parse( {
            codes, out, conversion: {
                Function: {
                    Literal: ( data: string ): string => `puts(${ data });`,
                    BinaryExpression: ( data: string[] ): string => `puts(${ data[ 0 ] }${ data[ 1 ] }${ data[ 2 ] });`,
                    Function: ( data: string[] ): string => `def ${ data[ 0 ] }(${ data[ 1 ] }) ${ data[ 2 ] } return ${ data[ 3 ] } end\n`,
                    VariableDeclaration: ( data ): string => `${ data[ 0 ] }=${ data[ 1 ] };`,
                    Kind: { let: ( data: string[] ): string => `${ data[ 0 ] }=${ data[ 1 ] };`, const: ( data: string[] ): string => `${ data[ 0 ] }=${ data[ 1 ] };` }
                },
                Print: {
                    Literal: ( data: string ): string => `puts(${ data })\n`,
                    FunIdentifier: ( data: string[] ): string => `puts(${ data[ 0 ] }(${ data[ 1 ] }))\n`,
                    Identifier: ( data: string ): string => `puts(${ data })\n`
                },
                Variable: {
                    Kind: { let: ( data: string[] ): string => `${ data[ 0 ] }=${ data[ 1 ] }\n`, const: ( data: string[] ): string => `${ data[ 0 ] }=${ data[ 1 ] }\n` }
                },
                IF: ( data: string[] ) =>
                {
                    return `if (${ data[ 0 ] }) ${ data[ 1 ] } end\n`;
                }
            }, mode
        } )
    )
    /*for ( const code of codes.body )
    {
        if ( code.type === "FunctionDeclaration" )
        {
            out = Function( code, out, {
                Literal: ( data: string ): string => `puts(${ data });`,
                BinaryExpression: ( data: string[] ): string => `puts(${ data[ 0 ] }${ data[ 1 ] }${ data[ 2 ] });`,
                Function: ( data: string[] ): string => `def ${ data[ 0 ] }(${ data[ 1 ] }) ${ data[ 2 ] } return ${ data[ 3 ] } end\n`,
                VariableDeclaration: ( data ): string => `${ data[ 0 ] }=${ data[ 1 ] };`,
                Kind: { let: ( data: string[] ): string => `${ data[ 0 ] }=${ data[ 1 ] };`, const: ( data: string[] ): string => `${ data[ 0 ] }=${ data[ 1 ] };` }
            } )
        }
        else if ( code.type === "ExpressionStatement" )
        {
            out = print( code, out, {
                Literal: ( data: string ): string => `puts(${ data })\n`,
                FunIdentifier: ( data: string[] ): string => `puts(${ data[ 0 ] }(${ data[ 1 ] }))\n`,
                Identifier: ( data: string ): string => `puts(${ data })\n`
            } )
        }
        else if ( code.type === "VariableDeclaration" )
        {
            out.cash.code = ""
            out.code += variable( code, out, {
                Kind: { let: ( data: string[] ): string => `${ data[ 0 ] }=${ data[ 1 ] }\n`, const: ( data: string[] ): string => `${ data[ 0 ] }=${ data[ 1 ] }\n` }
            } ).cash.code
        }
    }
    return out*/
}