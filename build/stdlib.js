(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process){
// Node.js is licensed for use as follows:

// """
// Copyright Node.js contributors. All rights reserved.

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
// IN THE SOFTWARE.
// """

// This license applies to parts of Node.js originating from the
// https://github.com/joyent/node repository:

// """
// Copyright Joyent, Inc. and other Node contributors. All rights reserved.
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
// IN THE SOFTWARE.
// """

// The Node.js license applies to all parts of Node.js that are not externally
// maintained libraries.

// The externally maintained libraries used by Node.js are:

// - c-ares, located at deps/cares, is licensed as follows:
//   """
//     Copyright 1998 by the Massachusetts Institute of Technology.
//     Copyright (C) 2007-2013 by Daniel Stenberg

//     Permission to use, copy, modify, and distribute this
//     software and its documentation for any purpose and without
//     fee is hereby granted, provided that the above copyright
//     notice appear in all copies and that both that copyright
//     notice and this permission notice appear in supporting
//     documentation, and that the name of M.I.T. not be used in
//     advertising or publicity pertaining to distribution of the
//     software without specific, written prior permission.
//     M.I.T. makes no representations about the suitability of
//     this software for any purpose.  It is provided "as is"
//     without express or implied warranty.
//   """

// - HTTP Parser, located at deps/http_parser, is licensed as follows:
//   """
//     http_parser.c is based on src/http/ngx_http_parse.c from NGINX copyright
//     Igor Sysoev.

//     Additional changes are licensed under the same terms as NGINX and
//     copyright Joyent, Inc. and other Node contributors. All rights reserved.

//     Permission is hereby granted, free of charge, to any person obtaining a copy
//     of this software and associated documentation files (the "Software"), to
//     deal in the Software without restriction, including without limitation the
//     rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
//     sell copies of the Software, and to permit persons to whom the Software is
//     furnished to do so, subject to the following conditions:

//     The above copyright notice and this permission notice shall be included in
//     all copies or substantial portions of the Software.

//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//     IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//     AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
//     IN THE SOFTWARE.
//   """

// - ICU, located at deps/icu, is licensed as follows:
//   """
//     ICU License - ICU 1.8.1 and later

//     COPYRIGHT AND PERMISSION NOTICE

//     Copyright (c) 1995-2015 International Business Machines Corporation and others

//     All rights reserved.

//     Permission is hereby granted, free of charge, to any person obtaining a copy
//     of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, and/or sell
//     copies of the Software, and to permit persons
//     to whom the Software is furnished to do so, provided that the above
//     copyright notice(s) and this permission notice appear in all copies
//     of the Software and that both the above copyright notice(s) and this
//     permission notice appear in supporting documentation.

//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
//     INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT OF THIRD PARTY RIGHTS. IN NO EVENT SHALL
//     THE COPYRIGHT HOLDER OR HOLDERS INCLUDED IN THIS NOTICE BE LIABLE FOR ANY CLAIM,
//     OR ANY SPECIAL INDIRECT OR CONSEQUENTIAL DAMAGES, OR ANY DAMAGES WHATSOEVER
//     RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT,
//     NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE
//     USE OR PERFORMANCE OF THIS SOFTWARE.

//     Except as contained in this notice, the name of a copyright holder shall not be
//     used in advertising or otherwise to promote the sale, use or other dealings in
//     this Software without prior written authorization of the copyright holder.

//     All trademarks and registered trademarks mentioned herein are the property of their respective owners.

//     Third-Party Software Licenses
//     This section contains third-party software notices and/or additional terms for licensed
//     third-party software components included within ICU libraries.

//     1. Unicode Data Files and Software

//     COPYRIGHT AND PERMISSION NOTICE

//     Copyright © 1991-2015 Unicode, Inc. All rights reserved.
//     Distributed under the Terms of Use in
//     http://www.unicode.org/copyright.html.

//     Permission is hereby granted, free of charge, to any person obtaining
//     a copy of the Unicode data files and any associated documentation
//     (the "Data Files") or Unicode software and any associated documentation
//     (the "Software") to deal in the Data Files or Software
//     without restriction, including without limitation the rights to use,
//     copy, modify, merge, publish, distribute, and/or sell copies of
//     the Data Files or Software, and to permit persons to whom the Data Files
//     or Software are furnished to do so, provided that
//     (a) this copyright and permission notice appear with all copies
//     of the Data Files or Software,
//     (b) this copyright and permission notice appear in associated
//     documentation, and
//     (c) there is clear notice in each modified Data File or in the Software
//     as well as in the documentation associated with the Data File(s) or
//     Software that the data or software has been modified.

//     THE DATA FILES AND SOFTWARE ARE PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
//     WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//     NONINFRINGEMENT OF THIRD PARTY RIGHTS.
//     IN NO EVENT SHALL THE COPYRIGHT HOLDER OR HOLDERS INCLUDED IN THIS
//     NOTICE BE LIABLE FOR ANY CLAIM, OR ANY SPECIAL INDIRECT OR CONSEQUENTIAL
//     DAMAGES, OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE,
//     DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
//     TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
//     PERFORMANCE OF THE DATA FILES OR SOFTWARE.

//     Except as contained in this notice, the name of a copyright holder
//     shall not be used in advertising or otherwise to promote the sale,
//     use or other dealings in these Data Files or Software without prior
//     written authorization of the copyright holder.

//     2. Chinese/Japanese Word Break Dictionary Data (cjdict.txt)

//      #    The Google Chrome software developed by Google is licensed under the BSD license. Other software included in this distribution is provided under other licenses, as set forth below.
//      #
//      # The BSD License
//      # http://opensource.org/licenses/bsd-license.php
//      # Copyright (C) 2006-2008, Google Inc.
//      #
//      # All rights reserved.
//      #
//      # Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
//      #
//      # Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
//      # Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
//      # Neither the name of  Google Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
//      #
//      #
//      # THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//      #
//      #
//      # The word list in cjdict.txt are generated by combining three word lists listed
//      # below with further processing for compound word breaking. The frequency is generated
//      # with an iterative training against Google web corpora.
//      #
//      # * Libtabe (Chinese)
//      #   - https://sourceforge.net/project/?group_id=1519
//      #   - Its license terms and conditions are shown below.
//      #
//      # * IPADIC (Japanese)
//      #   - http://chasen.aist-nara.ac.jp/chasen/distribution.html
//      #   - Its license terms and conditions are shown below.
//      #
//      # ---------COPYING.libtabe ---- BEGIN--------------------
//      #
//      # /*
//      #  * Copyrighy (c) 1999 TaBE Project.
//      #  * Copyright (c) 1999 Pai-Hsiang Hsiao.
//      #  * All rights reserved.
//      #  *
//      #  * Redistribution and use in source and binary forms, with or without
//      #  * modification, are permitted provided that the following conditions
//      #  * are met:
//      #  *
//      #  * . Redistributions of source code must retain the above copyright
//      #  *   notice, this list of conditions and the following disclaimer.
//      #  * . Redistributions in binary form must reproduce the above copyright
//      #  *   notice, this list of conditions and the following disclaimer in
//      #  *   the documentation and/or other materials provided with the
//      #  *   distribution.
//      #  * . Neither the name of the TaBE Project nor the names of its
//      #  *   contributors may be used to endorse or promote products derived
//      #  *   from this software without specific prior written permission.
//      #  *
//      #  * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
//      #  * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
//      #  * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
//      #  * FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
//      #  * REGENTS OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//      #  * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
//      #  * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
//      #  * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
//      #  * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
//      #  * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//      #  * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
//      #  * OF THE POSSIBILITY OF SUCH DAMAGE.
//      #  */
//      #
//      # /*
//      #  * Copyright (c) 1999 Computer Systems and Communication Lab,
//      #  *                    Institute of Information Science, Academia Sinica.
//      #  * All rights reserved.
//      #  *
//      #  * Redistribution and use in source and binary forms, with or without
//      #  * modification, are permitted provided that the following conditions
//      #  * are met:
//      #  *
//      #  * . Redistributions of source code must retain the above copyright
//      #  *   notice, this list of conditions and the following disclaimer.
//      #  * . Redistributions in binary form must reproduce the above copyright
//      #  *   notice, this list of conditions and the following disclaimer in
//      #  *   the documentation and/or other materials provided with the
//      #  *   distribution.
//      #  * . Neither the name of the Computer Systems and Communication Lab
//      #  *   nor the names of its contributors may be used to endorse or
//      #  *   promote products derived from this software without specific
//      #  *   prior written permission.
//      #  *
//      #  * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
//      #  * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
//      #  * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
//      #  * FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
//      #  * REGENTS OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//      #  * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
//      #  * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
//      #  * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
//      #  * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
//      #  * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//      #  * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
//      #  * OF THE POSSIBILITY OF SUCH DAMAGE.
//      #  */
//      #
//      # Copyright 1996 Chih-Hao Tsai @ Beckman Institute, University of Illinois
//      # c-tsai4@uiuc.edu  http://casper.beckman.uiuc.edu/~c-tsai4
//      #
//      # ---------------COPYING.libtabe-----END------------------------------------
//      #
//      #
//      # ---------------COPYING.ipadic-----BEGIN------------------------------------
//      #
//      # Copyright 2000, 2001, 2002, 2003 Nara Institute of Science
//      # and Technology.  All Rights Reserved.
//      #
//      # Use, reproduction, and distribution of this software is permitted.
//      # Any copy of this software, whether in its original form or modified,
//      # must include both the above copyright notice and the following
//      # paragraphs.
//      #
//      # Nara Institute of Science and Technology (NAIST),
//      # the copyright holders, disclaims all warranties with regard to this
//      # software, including all implied warranties of merchantability and
//      # fitness, in no event shall NAIST be liable for
//      # any special, indirect or consequential damages or any damages
//      # whatsoever resulting from loss of use, data or profits, whether in an
//      # action of contract, negligence or other tortuous action, arising out
//      # of or in connection with the use or performance of this software.
//      #
//      # A large portion of the dictionary entries
//      # originate from ICOT Free Software.  The following conditions for ICOT
//      # Free Software applies to the current dictionary as well.
//      #
//      # Each User may also freely distribute the Program, whether in its
//      # original form or modified, to any third party or parties, PROVIDED
//      # that the provisions of Section 3 ("NO WARRANTY") will ALWAYS appear
//      # on, or be attached to, the Program, which is distributed substantially
//      # in the same form as set out herein and that such intended
//      # distribution, if actually made, will neither violate or otherwise
//      # contravene any of the laws and regulations of the countries having
//      # jurisdiction over the User or the intended distribution itself.
//      #
//      # NO WARRANTY
//      #
//      # The program was produced on an experimental basis in the course of the
//      # research and development conducted during the project and is provided
//      # to users as so produced on an experimental basis.  Accordingly, the
//      # program is provided without any warranty whatsoever, whether express,
//      # implied, statutory or otherwise.  The term "warranty" used herein
//      # includes, but is not limited to, any warranty of the quality,
//      # performance, merchantability and fitness for a particular purpose of
//      # the program and the nonexistence of any infringement or violation of
//      # any right of any third party.
//      #
//      # Each user of the program will agree and understand, and be deemed to
//      # have agreed and understood, that there is no warranty whatsoever for
//      # the program and, accordingly, the entire risk arising from or
//      # otherwise connected with the program is assumed by the user.
//      #
//      # Therefore, neither ICOT, the copyright holder, or any other
//      # organization that participated in or was otherwise related to the
//      # development of the program and their respective officials, directors,
//      # officers and other employees shall be held liable for any and all
//      # damages, including, without limitation, general, special, incidental
//      # and consequential damages, arising out of or otherwise in connection
//      # with the use or inability to use the program or any product, material
//      # or result produced or otherwise obtained by using the program,
//      # regardless of whether they have been advised of, or otherwise had
//      # knowledge of, the possibility of such damages at any time during the
//      # project or thereafter.  Each user will be deemed to have agreed to the
//      # foregoing by his or her commencement of use of the program.  The term
//      # "use" as used herein includes, but is not limited to, the use,
//      # modification, copying and distribution of the program and the
//      # production of secondary products from the program.
//      #
//      # In the case where the program, whether in its original form or
//      # modified, was distributed or delivered to or received by a user from
//      # any person, organization or entity other than ICOT, unless it makes or
//      # grants independently of ICOT any specific warranty to the user in
//      # writing, such person, organization or entity, will also be exempted
//      # from and not be held liable to the user for any such damages as noted
//      # above as far as the program is concerned.
//      #
//      # ---------------COPYING.ipadic-----END------------------------------------

//     3. Lao Word Break Dictionary Data (laodict.txt)

//      # Copyright (c) 2013 International Business Machines Corporation
//      # and others. All Rights Reserved.
//      #
//      # Project:    http://code.google.com/p/lao-dictionary/
//      # Dictionary: http://lao-dictionary.googlecode.com/git/Lao-Dictionary.txt
//      # License:    http://lao-dictionary.googlecode.com/git/Lao-Dictionary-LICENSE.txt
//      #             (copied below)
//      #
//      # This file is derived from the above dictionary, with slight modifications.
//      # --------------------------------------------------------------------------------
//      # Copyright (C) 2013 Brian Eugene Wilson, Robert Martin Campbell.
//      # All rights reserved.
//      #
//      # Redistribution and use in source and binary forms, with or without modification,
//      # are permitted provided that the following conditions are met:
//      #
//      #  Redistributions of source code must retain the above copyright notice, this
//      #  list of conditions and the following disclaimer. Redistributions in binary
//      #  form must reproduce the above copyright notice, this list of conditions and
//      #  the following disclaimer in the documentation and/or other materials
//      #  provided with the distribution.
//      #
//      # THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
//      # ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
//      # WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
//      # DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
//      # ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
//      # (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
//      # LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
//      # ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
//      # (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
//      # SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//      # --------------------------------------------------------------------------------

//     4. Burmese Word Break Dictionary Data (burmesedict.txt)

//      # Copyright (c) 2014 International Business Machines Corporation
//      # and others. All Rights Reserved.
//      #
//      # This list is part of a project hosted at:
//      #   github.com/kanyawtech/myanmar-karen-word-lists
//      #
//      # --------------------------------------------------------------------------------
//      # Copyright (c) 2013, LeRoy Benjamin Sharon
//      # All rights reserved.
//      #
//      # Redistribution and use in source and binary forms, with or without modification,
//      # are permitted provided that the following conditions are met:
//      #
//      #   Redistributions of source code must retain the above copyright notice, this
//      #   list of conditions and the following disclaimer.
//      #
//      #   Redistributions in binary form must reproduce the above copyright notice, this
//      #   list of conditions and the following disclaimer in the documentation and/or
//      #   other materials provided with the distribution.
//      #
//      #   Neither the name Myanmar Karen Word Lists, nor the names of its
//      #   contributors may be used to endorse or promote products derived from
//      #   this software without specific prior written permission.
//      #
//      # THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
//      # ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
//      # WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
//      # DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
//      # ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
//      # (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
//      # LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
//      # ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
//      # (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
//      # SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//      # --------------------------------------------------------------------------------

//     5. Time Zone Database
//     ICU uses the public domain data and code derived from
//     Time Zone Database for its time zone support. The ownership of the TZ database is explained
//     in BCP 175: Procedure for Maintaining the Time Zone
//     Database section 7.

//     7.  Database Ownership

//        The TZ database itself is not an IETF Contribution or an IETF
//        document.  Rather it is a pre-existing and regularly updated work
//        that is in the public domain, and is intended to remain in the public
//        domain.  Therefore, BCPs 78 [RFC5378] and 79 [RFC3979] do not apply
//        to the TZ Database or contributions that individuals make to it.
//        Should any claims be made and substantiated against the TZ Database,
//        the organization that is providing the IANA Considerations defined in
//        this RFC, under the memorandum of understanding with the IETF,
//        currently ICANN, may act in accordance with all competent court
//        orders.  No ownership claims will be made by ICANN or the IETF Trust
//        on the database or the code.  Any person making a contribution to the
//        database or code waives all rights to future claims in that
//        contribution or in the TZ Database.
//   """

// - libuv, located at deps/uv, is licensed as follows:
//   """
//     libuv is part of the Node project: http://nodejs.org/
//     libuv may be distributed alone under Node's license:

//     ====

//     Copyright Joyent, Inc. and other Node contributors. All rights reserved.
//     Permission is hereby granted, free of charge, to any person obtaining a copy
//     of this software and associated documentation files (the "Software"), to
//     deal in the Software without restriction, including without limitation the
//     rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
//     sell copies of the Software, and to permit persons to whom the Software is
//     furnished to do so, subject to the following conditions:

//     The above copyright notice and this permission notice shall be included in
//     all copies or substantial portions of the Software.

//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//     IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//     AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
//     IN THE SOFTWARE.

//     ====

//     This license applies to all parts of libuv that are not externally
//     maintained libraries.

//     The externally maintained libraries used by libuv are:

//       - tree.h (from FreeBSD), copyright Niels Provos. Two clause BSD license.

//       - inet_pton and inet_ntop implementations, contained in src/inet.c, are
//         copyright the Internet Systems Consortium, Inc., and licensed under the ISC
//         license.

//       - stdint-msvc2008.h (from msinttypes), copyright Alexander Chemeris. Three
//         clause BSD license.

//       - pthread-fixes.h, pthread-fixes.c, copyright Google Inc. and Sony Mobile
//         Communications AB. Three clause BSD license.

//       - android-ifaddrs.h, android-ifaddrs.c, copyright Berkeley Software Design
//         Inc, Kenneth MacKay and Emergya (Cloud4all, FP7/2007-2013, grant agreement
//         n° 289016). Three clause BSD license.
//   """

// - OpenSSL, located at deps/openssl, is licensed as follows:
//   """
//     Copyright (c) 1998-2011 The OpenSSL Project.  All rights reserved.

//     Redistribution and use in source and binary forms, with or without
//     modification, are permitted provided that the following conditions
//     are met:

//     1. Redistributions of source code must retain the above copyright
//     notice, this list of conditions and the following disclaimer.

//     2. Redistributions in binary form must reproduce the above copyright
//     notice, this list of conditions and the following disclaimer in
//     the documentation and/or other materials provided with the
//     distribution.

//     3. All advertising materials mentioning features or use of this
//     software must display the following acknowledgment:
//     "This product includes software developed by the OpenSSL Project
//     for use in the OpenSSL Toolkit. (http://www.openssl.org/)"

//     4. The names "OpenSSL Toolkit" and "OpenSSL Project" must not be used to
//     endorse or promote products derived from this software without
//     prior written permission. For written permission, please contact
//     openssl-core@openssl.org.

//     5. Products derived from this software may not be called "OpenSSL"
//     nor may "OpenSSL" appear in their names without prior written
//     permission of the OpenSSL Project.

//     6. Redistributions of any form whatsoever must retain the following
//     acknowledgment:
//     "This product includes software developed by the OpenSSL Project
//     for use in the OpenSSL Toolkit (http://www.openssl.org/)"

//     THIS SOFTWARE IS PROVIDED BY THE OpenSSL PROJECT ``AS IS'' AND ANY
//     EXPRESSED OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//     IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//     PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE OpenSSL PROJECT OR
//     ITS CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
//     SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
//     NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
//     LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
//     HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
//     STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//     ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
//     OF THE POSSIBILITY OF SUCH DAMAGE.
//     ====================================================================

//     This product includes cryptographic software written by Eric Young
//     (eay@cryptsoft.com).  This product includes software written by Tim
//     Hudson (tjh@cryptsoft.com).
//   """

// - Punycode.js, located at lib/punycode.js, is licensed as follows:
//   """
//     Copyright Mathias Bynens <https://mathiasbynens.be/>

//     Permission is hereby granted, free of charge, to any person obtaining
//     a copy of this software and associated documentation files (the
//     "Software"), to deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify, merge, publish,
//     distribute, sublicense, and/or sell copies of the Software, and to
//     permit persons to whom the Software is furnished to do so, subject to
//     the following conditions:

//     The above copyright notice and this permission notice shall be
//     included in all copies or substantial portions of the Software.

//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
//     EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
//     MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//     NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
//     LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
//     OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
//     WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//   """

// - V8, located at deps/v8, is licensed as follows:
//   """
//     This license applies to all parts of V8 that are not externally
//     maintained libraries.  The externally maintained libraries used by V8
//     are:

//       - PCRE test suite, located in
//         test/mjsunit/third_party/regexp-pcre/regexp-pcre.js.  This is based on the
//         test suite from PCRE-7.3, which is copyrighted by the University
//         of Cambridge and Google, Inc.  The copyright notice and license
//         are embedded in regexp-pcre.js.

//       - Layout tests, located in test/mjsunit/third_party/object-keys.  These are
//         based on layout tests from webkit.org which are copyrighted by
//         Apple Computer, Inc. and released under a 3-clause BSD license.

//       - Strongtalk assembler, the basis of the files assembler-arm-inl.h,
//         assembler-arm.cc, assembler-arm.h, assembler-ia32-inl.h,
//         assembler-ia32.cc, assembler-ia32.h, assembler-x64-inl.h,
//         assembler-x64.cc, assembler-x64.h, assembler-mips-inl.h,
//         assembler-mips.cc, assembler-mips.h, assembler.cc and assembler.h.
//         This code is copyrighted by Sun Microsystems Inc. and released
//         under a 3-clause BSD license.

//       - Valgrind client API header, located at third_party/valgrind/valgrind.h
//         This is release under the BSD license.

//     These libraries have their own licenses; we recommend you read them,
//     as their terms may differ from the terms below.

//     Further license information can be found in LICENSE files located in
//     sub-directories.

//     Copyright 2014, the V8 project authors. All rights reserved.
//     Redistribution and use in source and binary forms, with or without
//     modification, are permitted provided that the following conditions are
//     met:

//         * Redistributions of source code must retain the above copyright
//           notice, this list of conditions and the following disclaimer.
//         * Redistributions in binary form must reproduce the above
//           copyright notice, this list of conditions and the following
//           disclaimer in the documentation and/or other materials provided
//           with the distribution.
//         * Neither the name of Google Inc. nor the names of its
//           contributors may be used to endorse or promote products derived
//           from this software without specific prior written permission.

//     THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
//     "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
//     LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
//     A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
//     OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
//     SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//     LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
//     DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
//     THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
//     (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
//     OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//   """

// - zlib, located at deps/zlib, is licensed as follows:
//   """
//     zlib.h -- interface of the 'zlib' general purpose compression library
//     version 1.2.8, April 28th, 2013

//     Copyright (C) 1995-2013 Jean-loup Gailly and Mark Adler

//     This software is provided 'as-is', without any express or implied
//     warranty.  In no event will the authors be held liable for any damages
//     arising from the use of this software.

//     Permission is granted to anyone to use this software for any purpose,
//     including commercial applications, and to alter it and redistribute it
//     freely, subject to the following restrictions:

//     1. The origin of this software must not be misrepresented; you must not
//     claim that you wrote the original software. If you use this software
//     in a product, an acknowledgment in the product documentation would be
//     appreciated but is not required.
//     2. Altered source versions must be plainly marked as such, and must not be
//     misrepresented as being the original software.
//     3. This notice may not be removed or altered from any source distribution.

//     Jean-loup Gailly        Mark Adler
//     jloup@gzip.org          madler@alumni.caltech.edu
//   """

// - npm, located at deps/npm, is licensed as follows:
//   """
//     The npm application
//     Copyright (c) npm, Inc. and Contributors
//     Licensed on the terms of The Artistic License 2.0

//     Node package dependencies of the npm application
//     Copyright (c) their respective copyright owners
//     Licensed on their respective license terms

//     The npm public registry at https://registry.npmjs.org
//     and the npm website at https://www.npmjs.com
//     Operated by npm, Inc.
//     Use governed by terms published on https://www.npmjs.com

//     "Node.js"
//     Trademark Joyent, Inc., https://joyent.com
//     Neither npm nor npm, Inc. are affiliated with Joyent, Inc.

//     The Node.js application
//     Project of Node Foundation, https://nodejs.org

//     The npm Logo
//     Copyright (c) Mathias Pettersson and Brian Hammond

//     "Gubblebum Blocky" typeface
//     Copyright (c) Tjarda Koster, https://jelloween.deviantart.com
//     Used with permission

//     --------

//     The Artistic License 2.0

//     Copyright (c) 2000-2006, The Perl Foundation.

//     Everyone is permitted to copy and distribute verbatim copies
//     of this license document, but changing it is not allowed.

//     Preamble

//     This license establishes the terms under which a given free software
//     Package may be copied, modified, distributed, and/or redistributed.
//     The intent is that the Copyright Holder maintains some artistic
//     control over the development of that Package while still keeping the
//     Package available as open source and free software.

//     You are always permitted to make arrangements wholly outside of this
//     license directly with the Copyright Holder of a given Package.  If the
//     terms of this license do not permit the full use that you propose to
//     make of the Package, you should contact the Copyright Holder and seek
//     a different licensing arrangement.

//     Definitions

//         "Copyright Holder" means the individual(s) or organization(s)
//         named in the copyright notice for the entire Package.

//         "Contributor" means any party that has contributed code or other
//         material to the Package, in accordance with the Copyright Holder's
//         procedures.

//         "You" and "your" means any person who would like to copy,
//         distribute, or modify the Package.

//         "Package" means the collection of files distributed by the
//         Copyright Holder, and derivatives of that collection and/or of
//         those files. A given Package may consist of either the Standard
//         Version, or a Modified Version.

//         "Distribute" means providing a copy of the Package or making it
//         accessible to anyone else, or in the case of a company or
//         organization, to others outside of your company or organization.

//         "Distributor Fee" means any fee that you charge for Distributing
//         this Package or providing support for this Package to another
//         party.  It does not mean licensing fees.

//         "Standard Version" refers to the Package if it has not been
//         modified, or has been modified only in ways explicitly requested
//         by the Copyright Holder.

//         "Modified Version" means the Package, if it has been changed, and
//         such changes were not explicitly requested by the Copyright
//         Holder.

//         "Original License" means this Artistic License as Distributed with
//         the Standard Version of the Package, in its current version or as
//         it may be modified by The Perl Foundation in the future.

//         "Source" form means the source code, documentation source, and
//         configuration files for the Package.

//         "Compiled" form means the compiled bytecode, object code, binary,
//         or any other form resulting from mechanical transformation or
//         translation of the Source form.

//     Permission for Use and Modification Without Distribution

//     (1)  You are permitted to use the Standard Version and create and use
//     Modified Versions for any purpose without restriction, provided that
//     you do not Distribute the Modified Version.

//     Permissions for Redistribution of the Standard Version

//     (2)  You may Distribute verbatim copies of the Source form of the
//     Standard Version of this Package in any medium without restriction,
//     either gratis or for a Distributor Fee, provided that you duplicate
//     all of the original copyright notices and associated disclaimers.  At
//     your discretion, such verbatim copies may or may not include a
//     Compiled form of the Package.

//     (3)  You may apply any bug fixes, portability changes, and other
//     modifications made available from the Copyright Holder.  The resulting
//     Package will still be considered the Standard Version, and as such
//     will be subject to the Original License.

//     Distribution of Modified Versions of the Package as Source

//     (4)  You may Distribute your Modified Version as Source (either gratis
//     or for a Distributor Fee, and with or without a Compiled form of the
//     Modified Version) provided that you clearly document how it differs
//     from the Standard Version, including, but not limited to, documenting
//     any non-standard features, executables, or modules, and provided that
//     you do at least ONE of the following:

//         (a)  make the Modified Version available to the Copyright Holder
//         of the Standard Version, under the Original License, so that the
//         Copyright Holder may include your modifications in the Standard
//         Version.

//         (b)  ensure that installation of your Modified Version does not
//         prevent the user installing or running the Standard Version. In
//         addition, the Modified Version must bear a name that is different
//         from the name of the Standard Version.

//         (c)  allow anyone who receives a copy of the Modified Version to
//         make the Source form of the Modified Version available to others
//         under

//             (i)  the Original License or

//             (ii)  a license that permits the licensee to freely copy,
//             modify and redistribute the Modified Version using the same
//             licensing terms that apply to the copy that the licensee
//             received, and requires that the Source form of the Modified
//             Version, and of any works derived from it, be made freely
//             available in that license fees are prohibited but Distributor
//             Fees are allowed.

//     Distribution of Compiled Forms of the Standard Version
//     or Modified Versions without the Source

//     (5)  You may Distribute Compiled forms of the Standard Version without
//     the Source, provided that you include complete instructions on how to
//     get the Source of the Standard Version.  Such instructions must be
//     valid at the time of your distribution.  If these instructions, at any
//     time while you are carrying out such distribution, become invalid, you
//     must provide new instructions on demand or cease further distribution.
//     If you provide valid instructions or cease distribution within thirty
//     days after you become aware that the instructions are invalid, then
//     you do not forfeit any of your rights under this license.

//     (6)  You may Distribute a Modified Version in Compiled form without
//     the Source, provided that you comply with Section 4 with respect to
//     the Source of the Modified Version.

//     Aggregating or Linking the Package

//     (7)  You may aggregate the Package (either the Standard Version or
//     Modified Version) with other packages and Distribute the resulting
//     aggregation provided that you do not charge a licensing fee for the
//     Package.  Distributor Fees are permitted, and licensing fees for other
//     components in the aggregation are permitted. The terms of this license
//     apply to the use and Distribution of the Standard or Modified Versions
//     as included in the aggregation.

//     (8) You are permitted to link Modified and Standard Versions with
//     other works, to embed the Package in a larger work of your own, or to
//     build stand-alone binary or bytecode versions of applications that
//     include the Package, and Distribute the result without restriction,
//     provided the result does not expose a direct interface to the Package.

//     Items That are Not Considered Part of a Modified Version

//     (9) Works (including, but not limited to, modules and scripts) that
//     merely extend or make use of the Package, do not, by themselves, cause
//     the Package to be a Modified Version.  In addition, such works are not
//     considered parts of the Package itself, and are not subject to the
//     terms of this license.

//     General Provisions

//     (10)  Any use, modification, and distribution of the Standard or
//     Modified Versions is governed by this Artistic License. By using,
//     modifying or distributing the Package, you accept this license. Do not
//     use, modify, or distribute the Package, if you do not accept this
//     license.

//     (11)  If your Modified Version has been derived from a Modified
//     Version made by someone other than you, you are nevertheless required
//     to ensure that your Modified Version complies with the requirements of
//     this license.

//     (12)  This license does not grant you the right to use any trademark,
//     service mark, tradename, or logo of the Copyright Holder.

//     (13)  This license includes the non-exclusive, worldwide,
//     free-of-charge patent license to make, have made, use, offer to sell,
//     sell, import and otherwise transfer the Package with respect to any
//     patent claims licensable by the Copyright Holder that are necessarily
//     infringed by the Package. If you institute patent litigation
//     (including a cross-claim or counterclaim) against any party alleging
//     that the Package constitutes direct or contributory patent
//     infringement, then this Artistic License to you shall terminate on the
//     date that such litigation is filed.

//     (14)  Disclaimer of Warranty:
//     THE PACKAGE IS PROVIDED BY THE COPYRIGHT HOLDER AND CONTRIBUTORS "AS
//     IS' AND WITHOUT ANY EXPRESS OR IMPLIED WARRANTIES. THE IMPLIED
//     WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR
//     NON-INFRINGEMENT ARE DISCLAIMED TO THE EXTENT PERMITTED BY YOUR LOCAL
//     LAW. UNLESS REQUIRED BY LAW, NO COPYRIGHT HOLDER OR CONTRIBUTOR WILL
//     BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
//     DAMAGES ARISING IN ANY WAY OUT OF THE USE OF THE PACKAGE, EVEN IF
//     ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

//     --------
//   """

// - GYP, located at tools/gyp, is licensed as follows:
//   """
//     Copyright (c) 2009 Google Inc. All rights reserved.

//     Redistribution and use in source and binary forms, with or without
//     modification, are permitted provided that the following conditions are
//     met:

//        * Redistributions of source code must retain the above copyright
//     notice, this list of conditions and the following disclaimer.
//        * Redistributions in binary form must reproduce the above
//     copyright notice, this list of conditions and the following disclaimer
//     in the documentation and/or other materials provided with the
//     distribution.
//        * Neither the name of Google Inc. nor the names of its
//     contributors may be used to endorse or promote products derived from
//     this software without specific prior written permission.

//     THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
//     "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
//     LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
//     A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
//     OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
//     SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//     LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
//     DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
//     THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
//     (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
//     OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//   """

// - marked, located at tools/doc/node_modules/marked, is licensed as follows:
//   """
//     Copyright (c) 2011-2012, Christopher Jeffrey (https://github.com/chjj/)

//     Permission is hereby granted, free of charge, to any person obtaining a copy
//     of this software and associated documentation files (the "Software"), to deal
//     in the Software without restriction, including without limitation the rights
//     to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to whom the Software is
//     furnished to do so, subject to the following conditions:

//     The above copyright notice and this permission notice shall be included in
//     all copies or substantial portions of the Software.

//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//     IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//     AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//     THE SOFTWARE.
//   """

// - cpplint.py, located at tools/cpplint.py, is licensed as follows:
//   """
//     Copyright (c) 2009 Google Inc. All rights reserved.

//     Redistribution and use in source and binary forms, with or without
//     modification, are permitted provided that the following conditions are
//     met:

//        * Redistributions of source code must retain the above copyright
//     notice, this list of conditions and the following disclaimer.
//        * Redistributions in binary form must reproduce the above
//     copyright notice, this list of conditions and the following disclaimer
//     in the documentation and/or other materials provided with the
//     distribution.
//        * Neither the name of Google Inc. nor the names of its
//     contributors may be used to endorse or promote products derived from
//     this software without specific prior written permission.

//     THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
//     "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
//     LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
//     A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
//     OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
//     SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//     LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
//     DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
//     THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
//     (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
//     OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//   """

// - ESLint, located at tools/eslint, is licensed as follows:
//   """
//     ESLint
//     Copyright (c) 2013 Nicholas C. Zakas. All rights reserved.

//     Permission is hereby granted, free of charge, to any person obtaining a copy
//     of this software and associated documentation files (the "Software"), to deal
//     in the Software without restriction, including without limitation the rights
//     to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to whom the Software is
//     furnished to do so, subject to the following conditions:

//     The above copyright notice and this permission notice shall be included in
//     all copies or substantial portions of the Software.

//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//     IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//     AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//     THE SOFTWARE.
//   """

// - gtest, located at deps/gtest, is licensed as follows:
//   """
//     Copyright 2008, Google Inc.
//     All rights reserved.

//     Redistribution and use in source and binary forms, with or without
//     modification, are permitted provided that the following conditions are
//     met:

//         * Redistributions of source code must retain the above copyright
//     notice, this list of conditions and the following disclaimer.
//         * Redistributions in binary form must reproduce the above
//     copyright notice, this list of conditions and the following disclaimer
//     in the documentation and/or other materials provided with the
//     distribution.
//         * Neither the name of Google Inc. nor the names of its
//     contributors may be used to endorse or promote products derived from
//     this software without specific prior written permission.

//     THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
//     "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
//     LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
//     A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
//     OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
//     SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//     LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
//     DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
//     THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
//     (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
//     OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//   """

// - node-weak, located at test/gc/node_modules/weak, is licensed as follows:
//   """
//     Copyright (c) 2011, Ben Noordhuis <info@bnoordhuis.nl>

//     Permission to use, copy, modify, and/or distribute this software for any
//     purpose with or without fee is hereby granted, provided that the above
//     copyright notice and this permission notice appear in all copies.

//     THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
//     WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
//     MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
//     ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
//     WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
//     ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
//     OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
//   """
'use strict';

var internalUtil;
var domain;

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.usingDomains = false;

EventEmitter.prototype.domain = undefined;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    // force global console to be compiled.
    // see https://github.com/nodejs/node/issues/4467
    console;
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {
  this.domain = null;
  if (EventEmitter.usingDomains) {
    // if there is an active domain, then attach to it.
    domain = domain || { active: false };
    if (domain.active && !(this instanceof domain.Domain)) {
      this.domain = domain.active;
    }
  }

  if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
    this._events = {};
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || isNaN(n))
    throw new TypeError('"n" argument must be a positive number');
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

// These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.
function emitNone(handler, isFn, self) {
  if (isFn)
    handler.call(self);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self);
  }
}
function emitOne(handler, isFn, self, arg1) {
  if (isFn)
    handler.call(self, arg1);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1);
  }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn)
    handler.call(self, arg1, arg2);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2);
  }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2, arg3);
  }
}

function emitMany(handler, isFn, self, args) {
  if (isFn)
    handler.apply(self, args);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].apply(self, args);
  }
}

EventEmitter.prototype.emit = function emit(type) {
  var er, handler, len, args, i, events, domain;
  var needDomainExit = false;
  var doError = (type === 'error');

  events = this._events;
  if (events)
    doError = (doError && events.error == null);
  else if (!doError)
    return false;

  domain = this.domain;

  // If there is no 'error' event listener then throw.
  if (doError) {
    er = arguments[1];
    if (domain) {
      if (!er)
        er = new Error('Uncaught, unspecified "error" event');
      er.domainEmitter = this;
      er.domain = domain;
      er.domainThrown = false;
      domain.emit('error', er);
    } else if (er instanceof Error) {
      throw er; // Unhandled 'error' event
    } else {
      // At least give some kind of context to the user
      var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
      err.context = er;
      throw err;
    }
    return false;
  }

  handler = events[type];

  if (!handler)
    return false;

  if (domain && this !== process) {
    domain.enter();
    needDomainExit = true;
  }

  var isFn = typeof handler === 'function';
  len = arguments.length;
  switch (len) {
    // fast cases
    case 1:
      emitNone(handler, isFn, this);
      break;
    case 2:
      emitOne(handler, isFn, this, arguments[1]);
      break;
    case 3:
      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
      break;
    case 4:
      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
      break;
    // slower
    default:
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      emitMany(handler, isFn, this, args);
  }

  if (needDomainExit)
    domain.exit();

  return true;
};

EventEmitter.prototype.addListener = function addListener(type, listener) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');

  events = this._events;
  if (!events) {
    events = this._events = {};
    this._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener) {
      this.emit('newListener', type,
                listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = this._events;
    }
    existing = events[type];
  }

  if (!existing) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++this._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] = [existing, listener];
    } else {
      // If we've already got an array, just append.
      existing.push(listener);
    }

    // Check for listener leak
    if (!existing.warned) {
      m = $getMaxListeners(this);
      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        if (!internalUtil)
          internalUtil = { error: function error() { console.error.apply(console, arguments); } };

        internalUtil.error('warning: possible EventEmitter memory ' +
                           'leak detected. %d %s listeners added. ' +
                           'Use emitter.setMaxListeners() to increase limit.',
                           existing.length, type);
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i;

      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');

      events = this._events;
      if (!events)
        return this;

      list = events[type];
      if (!list)
        return this;

      if (list === listener || (list.listener && list.listener === listener)) {
        if (--this._eventsCount === 0)
          this._events = {};
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length; i-- > 0;) {
          if (list[i] === listener ||
              (list[i].listener && list[i].listener === listener)) {
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (list.length === 1) {
          list[0] = undefined;
          if (--this._eventsCount === 0) {
            this._events = {};
            return this;
          } else {
            delete events[type];
          }
        } else {
          spliceOne(list, position);
        }

        if (events.removeListener)
          this.emit('removeListener', type, listener);
      }

      return this;
    };

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events;

      events = this._events;
      if (!events)
        return this;

      // not listening for removeListener, no need to emit
      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = {};
          this._eventsCount = 0;
        } else if (events[type]) {
          if (--this._eventsCount === 0)
            this._events = {};
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        for (var i = 0, key; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = {};
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners) {
        // LIFO order
        do {
          this.removeListener(type, listeners[listeners.length - 1]);
        } while (listeners[0]);
      }

      return this;
    };

EventEmitter.prototype.listeners = function listeners(type) {
  var evlistener;
  var ret;
  var events = this._events;

  if (!events)
    ret = [];
  else {
    evlistener = events[type];
    if (!evlistener)
      ret = [];
    else if (typeof evlistener === 'function')
      ret = [evlistener];
    else
      ret = arrayClone(evlistener, evlistener.length);
  }

  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  const events = this._events;

  if (events) {
    const evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }

  return 0;
}

// About 1.5x faster than the two-arg version of Array#splice().
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}

function arrayClone(arr, i) {
  var copy = new Array(i);
  while (i--)
    copy[i] = arr[i];
  return copy;
}

}).call(this,require('_process'))
},{"_process":2}],2:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],3:[function(require,module,exports){
/**
* Defines the clone function which can be used to create a deep copy of an
*   object.
* @param module The module to export the function onto.
*/
(function cloneModule(module) {
    'use strict';

    // Dependencies
    var typeOf = require('./typeof.js'),
        copy = require('./copy.js'),
        format = require('./format.js'),
        oclone;

    // Expose the function
    module.exports = clone;
    module.exports.register = register;
    module.exports.deregister = deregister;

    /**
    * Clones the given value.
    * @param val The value to clone.
    */
    function clone(val) {
        var trace = {
            objects: [],
            values: []
        };
        return doClone(trace, val);

        /**
        * Clones the given value.
        * @param trace An internal property used to prevent circular objects
        *   from causing issues.
        * @param val The value to clone.
        */
        function doClone(trace, val) {
            var vt, prop, res, idx;

            // Prevent recursive processing.
            idx = trace.objects.indexOf(val);
            if (idx > -1) {
                return trace.values[idx];
            }

            vt = typeOf(val);
            switch (vt) {
                case 'object':
                    res = {};
                    traceAdd(val, res);
                    for (prop in val) {
                        if (val.hasOwnProperty(prop)) {
                            res[prop] = doClone(trace, val[prop]);
                        }
                    }
                    return res;
                case 'function':
                    res = copy(val);
                    traceAdd(val, res);
                    for (prop in val) {
                        /* istanbul ignore else */
                        if (val.hasOwnProperty(prop)) {
                            res[prop] = doClone(trace, val[prop]);
                        }
                    }
                    return res;
                case 'array':
                    res = val.map(clone.bind(null, trace));
                    return res;
                // Shallow
                case 'regexp':
                case 'date':
                    return copy(val);
                case 'string':
                case 'number':
                case 'boolean':
                case 'nan':
                case 'null':
                case 'undefined':
                    return val;
                default:
                    throw new Error(
                        format('Unrecognized typeOf return value "{0}"', vt)
                    );
            }

            /**
            * Adds to the trace
            * @param obj The value we are cloning.
            * @param val The resulting value which the properties
            *   will be cloned onto.
            */
            function traceAdd(obj, val) {
                trace.objects.push(obj);
                trace.values.push(val);
            }
        }
    }

    /** Used to bind the clone function to Object.prototype */
    function boundClone() {
        var args, val;
        args = Array.prototype.slice.call(arguments);
        val = this.valueOf(); // jshint ignore:line
        return clone(val);
    }

    /** Binds the clone function to Object.prototype */
    function register() {
        if (Object.prototype.clone !== boundClone) {
            oclone = Object.prototype.clone;
            Object.prototype.clone = boundClone;
        }
    }

    /** Unbinds the clone function from the object prototype */
    function deregister() {
        if (Object.prototype.clone === boundClone) {
            Object.prototype.clone = oclone;
            oclone = undefined;
        }
    }
}(module));

},{"./copy.js":4,"./format.js":8,"./typeof.js":12}],4:[function(require,module,exports){
/**
* Defines the copy function which can be used to create a shallow copy of an
*   object.
* @param {object} module The module to export the copy function onto.
*/
(function copyModule(module) {
    'use strict';
    // Constants
    var SRC_FUNCTION_DYNAMIC =
            'var res = function {0}({1}) {{' +
                'if (this instanceof {0}) {{' +
                    'return create(ex, arguments);' +
                '}} else {{' +
                    'return ex.apply(this, arguments);' +
                '}}' +
            '}};' +
            'res.toString = ex.toString;' +
            'return res;',
        PROPERTY_NAME_ORIGINAL_FUNCTION = '§§§``~~!@#$%%^&*()-=/"")()*&^%$#@#%',
        CHARS = 'abcdefghijklmnopqrstuvwxyz',
    // Dependencies
        typeOf = require('./typeof.js'),
        format = require('./format.js'),
        ocopy;

    // Expose the function
    module.exports = copy;
    module.exports.dynamic = true;
    module.exports.register = register;
    module.exports.deregister = deregister;

    /**
    * Creates a copy of the given value.
    * @param val The value to copy.
    * @returns The copied value.
    */
    function copy(val) {
        var vt = typeOf(val),
            opts,
            prop,
            res;
        switch (vt) {
            case 'regexp':
                opts = '';
                if (val.ignoreCase) {
                    opts += 'i';
                }
                if (val.global) {
                    opts += 'g';
                }
                if (val.multiline) {
                    opts += 'm';
                }
                return new RegExp(val.source, opts);
            case 'date':
                return new Date(val.getTime());
            case 'object':
                res = {};
                for (prop in val) {
                    if (val.hasOwnProperty(prop)) {
                        res[prop] = val[prop];
                    }
                }
                return res;
            case 'array':
                return val.slice();
            case 'function':
                return copyFunc(val);
            case 'null':
            case 'nan':
            case 'string':
            case 'boolean':
            case 'undefined':
            case 'number':
                // Value types can just be returned :)
                return val;
            default:
                throw new Error(
                    format('Unrecognized typeOf return value "{0}"', vt)
                );
        }

        /**
        * Wraps the supplied function (unwrapping it if it is itself a wrap) so
        *   that it may have it's properties manipulated.
        * @param {function} func The function to wrap.
        * @returns {function} The new function.
        */
        function copyFunc(func) {
            var prop, res;

            var dynamic = module.exports.dynamic;
            if (dynamic) {
                res = dynamicWrap(func);
            } else {
                res = staticWrap;
            }

            // Copy any properties.
            for (prop in func) {
                /* istanbul ignore else */
                if (func.hasOwnProperty(prop)) {
                    res[prop] = func[prop];
                }
            }

            return res;

            /** Creates a static wrap of the function */
            function staticWrap() {
                // jshint validthis:true
                if (this instanceof staticWrap) {
                    return create(func, Array.prototype.slice.call(arguments));
                } else {
                    return func.apply(this, arguments);
                }
            }
        }

        /**
        * Creates a wrap for the supplied function which will copy the name
        *   and argument list into the new function using the Function
        *   constructor.
        * @param {function} func The function to wrap. If the function is itself
        *   a wrap, the original function will be wrapped rather than the
        *   wrapping function.
        * @returns {function} The wrapping function.
        */
        function dynamicWrap(func) {
            var ftxt, wrap, name, argText, factory;

            // Get the function details
            name = func.name || 'x';
            argText = generateArgs(func.size);
            ftxt = format(SRC_FUNCTION_DYNAMIC, name, argText);

            // We can unwrap here without issue since the consumer copies the
            //  properties across.
            if (typeof func[PROPERTY_NAME_ORIGINAL_FUNCTION] === 'function') {
                func = func[PROPERTY_NAME_ORIGINAL_FUNCTION];
            }

            // Create the factory function that will actually create our
            //  wrapped function.
            factory = new Function(['ex', 'create'], ftxt);// jshint ignore:line

            // Create the wrap
            wrap = factory(Function.apply.bind(func), create);

            // Create hidden property
            Object.defineProperty(wrap, PROPERTY_NAME_ORIGINAL_FUNCTION, {
                enumerable: false,
                value: func
            });

            return wrap;

            /**
            * Generates a comma separated string of unique values.
            * @param {number} len The number of values to generate.
            * @returns {string} A string of names separated by comma.
            */
            function generateArgs(len) {
                var res = [],
                    argName,
                    cnt = 0;

                while (cnt < len) {
                    argName = toBase(cnt, CHARS.length)
                        .map(asChar)
                        .join('');
                    res.push(argName);
                    cnt++;
                }
                return res.join(',');

                /**
                * Returns the character at the specified index
                * @param {number} idx The character index to retrieve.
                * @returns {string} The character at the specified index.
                */
                function asChar(idx) {
                    return CHARS[idx];
                }
            }

            /**
            * Converts the integer base, passing the individual digit values
            *   inside an array.
            * @param {number} num The number to convert.
            * @param {number} base The base to convert to.
            * @returns {array} An array of values for the digits.
            */
            function toBase(num, base) {
                var res, unit;
                res = [];
                while (num) {
                    unit = num % base;
                    res.push(unit);
                    num -= unit;
                    num = num / base;
                }
                num = res.reverse();
                return num;
            }
        }

        /**
        * Creates a new instance of the supplied function type
        * @param {function} func The constructor function.
        * @param {array} args The arguments to pass to the constructor function.
        */
        function create(func, args) {
            var res, res2;
            res = Object.create(func.prototype);
            res2 = func.apply(res, args);
            if (res2 && typeof res2 === 'object') {
                res = res2;
            }
            return res;
        }
    }

    /** Used to bind the copy function to Object.prototype */
    function boundCopy() {
        var args, val;
        args = Array.prototype.slice.call(arguments);
        val = this.valueOf(); // jshint ignore:line
        return copy(val);
    }

    /** Binds the copy function to Object.prototype */
    function register() {
        if (Object.prototype.copy !== boundCopy) {
            ocopy = Object.prototype.copy;
            Object.prototype.copy = boundCopy;
        }
    }

    /** Unbinds the copy function from the object prototype */
    function deregister() {
        if (Object.prototype.copy === boundCopy) {
            Object.prototype.copy = ocopy;
            ocopy = undefined;
        }
    }
}(module));

},{"./format.js":8,"./typeof.js":12}],5:[function(require,module,exports){
(function (process,global){
/**
* Extended promise module that extends native promises with some additional
*   functions to assist in working with them.
* @param {object} module The module to export to.
* @param {function} Promise The global promise function.
* @param {object} console The logging object.
* @param {object} process The global process control object (used for nextTick)
*/
(function epromiseModule(module, Promise, console, process) {
    'use strict';
    // Expose the extended promise.
    /* istanbul ignore else */
    if (Promise) {
        module.exports = ExtendedPromise;
    } else {
        module.exports = undefined;
    }

    /**
    * Defines the ExtendedPromise constructor which defines extended promise
    *   functions.
    * @param {function} executor The promise executor. This will be called
    *   with the following signature (resolve, reject, notify).
    */
    function ExtendedPromise(executor) {
        var self = this,
            notifyHandlers = [],
            completed = false,
            notTicked = [],
            prom;
        checkPromise();
        if (typeof executor !== 'function') {
            throw new Error('supplied executor MUST be a function');
        }
        // Call the base constructor
        prom = new Promise(exec);
        this.prototype = prom;
        this.trace = ExtendedPromise.trace;

        // Instance functions
        this.then = then;
        self.catch = prom.catch;
        this.notify = notify;
        this.finally = complete;
        this.callback = callback;

        // We do this to queue the notifications until consumers have had a
        //  chance to bind handlers.
        process.nextTick(onTick);

        // When complete, clear the handlers to ensure references are cleared
        //  and we don't leak
        complete(clearNotifyHandlers);

        /**
        * The executor function.
        * @param {function} res The resolve function.
        * @param {function} rej The reject function.
        */
        function exec(res, rej) {
            executor(onRes, onRej, doNotify);

            /**
            * Called when the consumer resolves a promise
            * @param arg The argument to pass along to the resolved handlers.
            */
            function onRes(arg) {
                if (self.trace) {
                    self.resolvedStackTrace = stack(1);
                }
                onTick();
                completed = true;
                res(arg);
            }

            /**
            * Called when the consumer rejects a promise
            * @param arg The argument to pass along to the reject handlers.
            */
            function onRej(arg) {
                if (self.trace) {
                    self.resolvedStackTrace = stack(1);
                }
                onTick();
                completed = true;
                rej(arg);
            }
        }

        /**
        * Called to assign handlers to the promise.
        * @param {function} onRes The function to call when the promise has
        *   been resolved.
        * @param {function} onRej The function to call when the promise has
        *   been rejected.
        * @param {function} onNot The function to call when a notification has
        *   been recieved.
        */
        function then(onRes, onRej, onNot) {
            prom.then(onRes, onRej);
            notify(onNot);
            return self;
        }

        /**
        * Called by the promise executor to notify the promise consumer of
        *   some ongoing change. This will queue notifications until the first
        *   tick has passed to allow handlers to be bound.
        * Note: If the promise is resolved before a tick happens,
        *   notifications will never be delivered.
        * @param arg The argument to pass to the notify handlers.
        */
        function doNotify(arg) {
            // Note: If the promise is resolved before a tick happens,
            //  notifications will never be delivered.
            if (completed) {
                return;
            }
            // If we have not ticked, queue the notification
            if (notTicked) {
                notTicked.push(arg);
            } else {
                executeHandlers(arg);
            }

            /**
            * Executes the handlers with the suppied argument
            * @param arg The argument to pass to the notify handlers.
            */
            function executeHandlers(arg) {
                var i;
                for (i = 0; i < notifyHandlers.length; i++) {
                    try {
                        notifyHandlers[i](arg);
                    } catch (err) {
                        console.error('Error in promise notify handler');
                        console.error(err);
                    }
                }
            }
        }

        /**
        * Called to add handlers to execute on notification.
        * @param {function} handler The handler to call when a notification is
        *   received.
        */
        function notify(handler) {
            if (typeof handler === 'function') {
                notifyHandlers.push(handler);
            }
            return self;
        }

        /**
        * Called to add a handler to execute when the promise has completed.
        * @param {function} handler The handler to call when the promise has
        *   been resolved or rejected.
        */
        function complete(handler) {
            self.then(handler);
            self.catch(handler);
            return self;
        }

        /**
        * Executed a callback from the promises given state.
        * @param {function} cb The callback to execute when the promise is
        *   resolved or rejected.
        */
        function callback(cb) {
            if (typeof cb === 'function') {
                try {
                    self.then(cb.bind(null, null));
                    self.catch(cb);
                } catch(err) {
                    // We cannot do any more than log
                    console.error(err);
                }
            }
            return self;
        }

        /** Removes all items from the notification array */
        function clearNotifyHandlers() {
            notTicked.length = 0;
            notTicked = undefined;
        }

        /** Called the first tick after creation */
        function onTick() {
            var notis;
            if (notTicked) {
                notis = notTicked;
                notTicked = undefined;
                notis.forEach(doNotify);
            }
        }
    }

    ExtendedPromise.all = all;
    ExtendedPromise.race = race;
    ExtendedPromise.resolve = resolve;
    ExtendedPromise.reject = reject;
    ExtendedPromise.defer = defer;
    ExtendedPromise.callback = callback;
    ExtendedPromise.trace = false;

    /**
    * Returns a promise that resolves or rejects as soon as one of the supplied
    *   promises resolves or rejects.
    * @param {array} promises An array containing the promises to execute.
    */
    function all(promises) {
        var deferred = defer(),
            results = [],
            reach,
            cnt;

        cnt = 0;
        reach = promises.length;
        promises.forEach(processPromise);

        return deferred.promise;

        /**
        * Processes the supplied promise.
        * @param prom The promise to process.
        * @param {number} index The index of the promise being processed.
        */
        function processPromise(prom, index) {
            prom.then(onComplete.bind(null, index))
                .catch(deferred.reject);
        }

        /**
        * Called when one of the supplied promises is complete.
        * @param {number} index The index of the promise being completed.
        * @param arg The argument the promise resolved with.
        */
        function onComplete(index, arg) {
            results[index] = arg;
            cnt++;
            if (cnt === reach) {
                deferred.resolve(results);
            }
        }
    }

    /**
    * Returns a promise that resolves or rejects as soon as one of the supplied
    *   promises resolves or rejects.
    * @param promises An array or object containing the promises to execute.
    */
    function race(promises) {
        var deferred = defer(),
            prom;
        for (prom in promises) {
            if (promises.hasOwnProperty(prom)) {
                promises[prom]
                    .then(deferred.resolve)
                    .catch(deferred.reject);
            }
        }
        return deferred.promise;
    }

    /**
    * Creates and resolves a promise with the given argument.
    * @param arg The argument to pass to the resolve function.
    */
    function resolve(arg) {
        var deferred = defer();
        deferred.resolve(arg);
        return deferred.promise;
    }

    /**
    * Creates and rejects a promise with the given argument.
    * @param arg The argument to pass to the reject function.
    */
    function reject(arg) {
        var deferred = defer();
        deferred.reject(arg);
        return deferred.promise;
    }

    /**
    * Creates an object which contains a promise, and can be used to manipulate
    *   it's state.
    */
    function defer() {
        var resolve, reject, notify, promise;
        promise = new ExtendedPromise(executor);
        return {
            promise: promise,
            resolve: resolve,
            reject: reject,
            notify: notify
        };

        /**
        * The promise executor.
        * @param {function} res The function to call to resolve the promise.
        * @param {function} rej The function to call to reject the promise.
        * @param {function} noti The function to call to perform a notification.
        */
        function executor(res, rej, noti) {
            resolve = res;
            reject = rej;
            notify = noti;
        }
    }

    /**
    * Wraps a given function that has a callback style to provide a fast way
    *   to turn a callback style function into a promise style
    * Note: This only supports a single result argument in the callback
    * @param context Optional context to execute the callback in.
    *   Note: If this is supplied as a function, it will be assumed that
    *       function is actually the func argument
    * @param func The function to execute.
    */
    function callback(context, func) {
        var deferred = defer(),
            offset = 1,
            args;
        if (typeof context === 'function') {
            func = context;
            context = null;
        } else if (typeof func === 'function') {
            offset = 2;
        } else {
            throw new Error('Not function provided to execute');
        }
        args = Array.prototype.slice.call(arguments, offset);
        args.push(onComplete);
        func.apply(context, args);
        return deferred.promise;

        /**
        * Called once the function execution is complete
        * @param err Error information if the process failed.
        * @param res The response data, on success.
        */
        function onComplete(err, res) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(res);
            }
        }
    }

    /** Checks that a native promise exists, and if not throws an error. */
    function checkPromise() {
        /* istanbul ignore if */
        if (!Promise) {
            throw new Error('No native promise implementation found! This ' +
                'module extends native promise functionality');
        }
    }

    /**
    * Generates a stack trace from the frame skip levels above the current.
    * @param {number} skip The number of stack frames to skip.
    */
    function stack(skip) {
        var st;
        skip = skip + 1;
        st = (new Error()).stack || '';
        st = st.split('\n');
        st.shift();
        while (skip) {
            st.shift();
            skip--;
        }
        return st.join('\n');
    }
}(module, global.Promise, global.console, process));

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":2}],6:[function(require,module,exports){
/**
* Defines the extend function which can be used to extend one object with
*   another's properties.
* @param {object} module The module to export the extend function onto.
*/
(function extendModule(module) {
    'use strict';

    // Dependencies
    var typeOf = require('./typeof.js'),
        format = require('./format.js'),
        copy = require('./copy.js'),
        oextend;

    // Expose the extend function
    module.exports = extend;
    module.exports.register = register;
    module.exports.deregister = deregister;

    /**
    * Extends dest with src, then srcN (for all extendable arguments)
    *   Note: Any sub objects which are extendable, but do not match the source
    *       type, will be re-created and have their properties transferred
    *       across to the new instance of the correct type before transferring
    *       properties from the source object. This change of type does not
    *       happen at the root level. ie. dest will always be the object
    *       or function supplied, and will only have properties copied across.
    * @param {object} dest The destination object to copy to.
    * @param {object} src The object to copy from.
    * @param {object} srcN The next object to copy from.
    * @returns {object} dest
    */
    function extend(dest, src, srcN) {
        var dt = typeOf(dest),
            st = typeOf(src),
            args;

        // We only continue if some properties can be copied.
        if (isExtendable(dt) && isExtendable(st)) {
            // Copy from source to dest
            Object.keys(src).forEach(process);

            // If we have more arguments to process, process them.
            if (srcN) {
                args = Array.prototype.slice.call(arguments, 2);
                args.unshift(dest);
                /* jshint validthis:true */
                extend.apply(this, args);
            }
        }

        return dest;

        /**
        * Processes the given key name.
        * @param name The name of the key to process.
        */
        function process(name) {
            var dt = typeOf(dest[name]),
                st = typeOf(src[name]),
                val;

            if (isExtendable(dt) && isExtendable(st)) {
                if (dt === st) {
                    dest[name] = extend(dest[name], src[name]);
                } else {
                    // Create new value for prop on dest of source type
                    val = changeType(st, dest[name], src[name]);
                    // Copy properties from source
                    val = extend(val, src[name]);
                    dest[name] = val;
                }
            } else {
                dest[name] = src[name];
            }
        }

        /**
        * Creates a new object, array or function and copies the properties
        *   across from val onto the new type.
        * @param {string} to The type to change to. MUST be object, array or
        *   function
        * @param val The value to copy the properties from.
        * @param {function} func The function to copy in the case we are
        *   changing type to a function.
        */
        function changeType(to, val, func) {
            var res, prop;
            // Create new value for prop on dest of source type
            switch (to) {
                case 'object':
                    res = {};
                    break;
                case 'array':
                    res = [];
                    break;
                case 'function':
                    res = copy(func);
                    break;
                default:
                    throw new Error(
                        format('Unrecognized extendable type "{0}"', st)
                    );
            }
            // Copy properties from dest onto new object
            for (prop in val) {
                /* istanbul ignore else */
                if (val.hasOwnProperty(prop)) {
                    res[prop] = val[prop];
                }
            }
            return res;
        }

        /**
        * Checks whether the given type is extendable.
        * @param {string} type The value type to check.
        */
        function isExtendable(type) {
            return type === 'object' || type === 'function' || type === 'array';
        }
    }

    /** Used to bind the extend function to Object.prototype */
    function boundExtend() {
        var args, val;
        args = Array.prototype.slice.call(arguments);
        val = this.valueOf(); // jshint ignore:line
        args.unshift(val);
        return extend.apply(null, args);
    }

    /** Binds the extend function to Object.prototype */
    function register() {
        if (Object.prototype.extend !== boundExtend) {
            oextend = Object.prototype.extend;
            Object.prototype.extend = boundExtend;
        }
    }

    /** Unbinds the extend function from the object prototype */
    function deregister() {
        if (Object.prototype.extend === boundExtend) {
            Object.prototype.extend = oextend;
            oextend = undefined;
        }
    }
}(module));

},{"./copy.js":4,"./format.js":8,"./typeof.js":12}],7:[function(require,module,exports){
(function (global){
/**
* Holds the date formatting code for the format module.
* @param {object} module The module to attach exports to.
* @param {object} Intl The javascript internationalization object.
*/
(function formatDateModule(module, Intl) {
    'use strict';

    // Expose the format function
    module.exports = formatDate;

    /**
    * Formats the date
    * @param {Date} date The date to format.
    * @param {string} fmt The format string.
    * @param {string} locale Optional locale to use when formatting the date.
    *   When not supplied, the default system locale will be used.
    */
    function formatDate(date, fmt, locale) {
        switch (fmt) {
            case 'd':
                return short();
            case 'D':
                return long();
            case 'f':
                return fullShort();
            case 'F':
                return fullLong();
            case 'g':
                return generalShort();
            case 'G':
                return generalLong();
            case 'm':
            case 'M':
                return monthDay();
            case 's':
                return sortableDateTime();
            case 'u':
                return sortableISO();
            case 'U':
                return universal();
            case 't':
                return timeShort();
            case 'T':
                return timeLong();
            case 'y':
            case 'Y':
                return yearMonth();
            default:
                return formatCustom(fmt);
        }

        /** Formats the date for the "d" specifier */
        function short() {
            return date.toLocaleDateString(locale);
        }

        /** Formats the date for the "D" specifier */
        function long() {
            return doFormat(date, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
            });
        }

        /** Formats the date for the "f" specifier */
        function fullShort() {
            return doFormat(date, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
                hour: 'numeric',
                minute: '2-digit'
            });
        }

        /** Formats the date for the "F" specifier */
        function fullLong() {
            return doFormat(date, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
                hour: 'numeric',
                minute: '2-digit',
                second: '2-digit'
            });
        }

        /** Formats the date for the "g" specifier */
        function generalShort() {
            return doFormat(date, {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
            });
        }

        /** Formats the date for the "G" specifier */
        function generalLong() {
            return doFormat(date, {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                second: '2-digit'
            });
        }

        /** Formats the date for the "G" specifier */
        function monthDay() {
            return doFormat(date, {
                month: 'long',
                day: 'numeric'
            });
        }

        /** Formats the date for the "s" specifier */
        function sortableDateTime() {
            return formatCustom('yyyy-MM-ddTHH:mm:ss');
        }

        /** Formats the date for the "u" specifier */
        function sortableISO() {
            return date.toISOString();
        }

        /** Formats the date for the "U" specifier */
        function universal() {
            return doFormat(date, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
                hour: 'numeric',
                minute: '2-digit',
                second: '2-digit'
            });
        }

        /** Formats the date for the "t" specifier */
        function timeShort() {
            return doFormat(date, {
                hour: 'numeric',
                minute: '2-digit'
            });
        }

        /** Formats the date for the "T" specifier */
        function timeLong() {
            return doFormat(date, {
                hour: 'numeric',
                minute: '2-digit',
                second: '2-digit'
            });
        }

        /** Formats the date for the "y" specifier */
        function yearMonth() {
            return doFormat(date, {
                year: 'numeric',
                month: 'long'
            });
        }

        /**
        * Performs custom formatting
        * @param {string} fmt The format string.
        */
        function formatCustom(fmt) {
            var pos, sub, tmp, skip, res, timemin1d, timemin2d, timesec1d,
                timesec2d, timems1d, timems2d, timems3d, dayFull, dayAbr,
                monthAbbr, monthFull, date1d, date2d, month1d, month2d, year2d,
                year4d, tzhour1d, tzhour2d, tzhourmin;
            timemin1d = new Intl.DateTimeFormat(locale, { minute: 'numeric' });
            timemin2d = { format: patch({ minute: '2-digit' }) };
            timesec1d = new Intl.DateTimeFormat(locale, { second: 'numeric' });
            timesec2d = { format: patch({ second: '2-digit' }) };
            timems1d = { format: msFetch.bind(null, 1) };
            timems2d = { format: msFetch.bind(null, 2) };
            timems3d = { format: msFetch.bind(null, 3) };
            dayFull = new Intl.DateTimeFormat(locale, { weekday: 'long' });
            dayAbr = new Intl.DateTimeFormat(locale, { weekday: 'short' });
            date1d = new Intl.DateTimeFormat(locale, { day: 'numeric' });
            date2d = new Intl.DateTimeFormat(locale, { day: '2-digit' });
            month1d = new Intl.DateTimeFormat(locale, { month: 'numeric' });
            month2d = new Intl.DateTimeFormat(locale, { month: '2-digit' });
            monthAbbr = new Intl.DateTimeFormat(locale, { month: 'short' });
            monthFull = new Intl.DateTimeFormat(locale, { month: 'long' });
            year2d = new Intl.DateTimeFormat(locale, { year: '2-digit' });
            year4d = new Intl.DateTimeFormat(locale, { year: 'numeric' });
            tzhour1d = { format: tzFetch.bind(null, 'z') };
            tzhour2d = { format: tzFetch.bind(null, 'zz') };
            tzhourmin = { format: tzFetch.bind(null, 'zzz') };

            res = [];
            for (pos = 0; pos < fmt.length; pos++) {
                if (skip) {
                    skip = false;
                    res.push(fmt[pos]);
                    continue;
                }
                switch (fmt[pos]) {
                    case '\\':
                        skip = true;
                        break;
                    case 'h':
                        sub = readBlock(2);
                        tmp = String(date.getHours() % 12);
                        if (sub.length === 1) {
                            res.push(tmp);
                        } else {
                            tmp = zeroPad(2, tmp);
                            res.push(tmp);
                        }
                        break;
                    case 'H':
                        sub = readBlock(2);
                        tmp = String(date.getHours());
                        if (sub.length === 1) {
                            res.push(tmp);
                        } else {
                            tmp = zeroPad(2, tmp);
                            res.push(tmp);
                        }
                        break;
                    case 'm':
                        sub = readBlock(2);
                        if (sub.length === 1) {
                            res.push(timemin1d.format(date));
                        } else {
                            res.push(timemin2d.format(date));
                        }
                        break;
                    case 's':
                        sub = readBlock(2);
                        if (sub.length === 1) {
                            res.push(timesec1d.format(date));
                        } else {
                            res.push(timesec2d.format(date));
                        }
                        break;
                    case 'f':
                        sub = readBlock(3);
                        if (sub.length === 1) {
                            res.push(timems1d.format(date));
                        } else if (sub.length === 2) {
                            res.push(timems2d.format(date));
                        } else {
                            res.push(timems3d.format(date));
                        }
                        break;
                    case 'F':
                        sub = readBlock(3);
                        tmp = date.getMilliseconds();
                        tmp = String(tmp);
                        tmp = zeroPad(3, tmp);
                        tmp = tmp.split('');
                        while (tmp.length > sub.length) {
                            tmp.pop();
                        }
                        while (tmp[tmp.length - 1] === '0') {
                            tmp.pop();
                        }
                        res.push(tmp.join(''));
                        break;
                    case 'd':
                        sub = readBlock(4);
                        if (sub.length === 1) {
                            res.push(date1d.format(date));
                        } else if (sub.length === 2) {
                            res.push(date2d.format(date));
                        } else if (sub.length === 3) {
                            res.push(dayAbr.format(date));
                        } else {
                            res.push(dayFull.format(date));
                        }
                        break;
                    case 'M':
                        sub = readBlock(4);
                        if (sub.length === 1) {
                            res.push(month1d.format(date));
                        } else if (sub.length === 2) {
                            res.push(month2d.format(date));
                        } else if (sub.length === 3) {
                            res.push(monthAbbr.format(date));
                        } else {
                            res.push(monthFull.format(date));
                        }
                        break;
                    case 'y':
                        sub = readBlock(4);
                        if (sub.length === 1) {
                            res.push('y');
                        } else if (sub.length === 2) {
                            res.push(year2d.format(date));
                        } else if (sub.length === 3) {
                            res.push(year2d.format(date));
                            res.push('y');
                        } else {
                            res.push(year4d.format(date));
                        }
                        break;
                    case 'z':
                        sub = readBlock(3);
                        if (sub.length === 1) {
                            res.push(tzhour1d.format(date));
                        } else if (sub.length === 2) {
                            res.push(tzhour2d.format(date));
                        } else {
                            res.push(tzhourmin.format(date));
                        }
                        break;
                    default:
                        res.push(fmt[pos]);
                        break;
                }
            }

            return res.join('');

            /**
            * Reads a block off the stream. The max is the maximum number of
            *   repeated characters that may appear in a block.
            * @param {number} max The maximum number of characters the block can
            *   contain.
            */
            function readBlock(max) {
                var start = fmt[pos],
                    res = start;
                while (fmt[pos + 1] === start && res.length < max) {
                    res += start;
                    pos++;
                }
                return res;
            }
        }

        /**
        * Performs an Intl format.
        * @param {date} date The date to format.
        * @param {object} args The arguments to pass to the formatter.
        * @returns {string} The value from the date as formatted by the
        *   date time formatter.
        */
        function doFormat(date, args) {
            var formatter = new Intl.DateTimeFormat(locale, args);
            return formatter.format(date);
        }

        /**
        * Fixes the fact that sometimes the 2-digit seems to return a single
        *   digit.
        * @param {object} args The format args to pass to the formatter.
        * @returns {function} A function which can be executes to format
        *   the date and lengthen the return.
        */
        function patch(args) {
            var formatter = new Intl.DateTimeFormat(locale, args);
            // Not sure why this returns a single digit...
            //  easy enough to work around.
            return ensure2;

            /**
            * Formats the date, and ensures the return is at least 2 characters
            *   long.
            */
            function ensure2() {
                var res = formatter.format(date);
                if (res.length < 2) {
                    return '0' + res;
                } else {
                    return res;
                }
            }
        }

        /**
        * Gets the ms as a string of lenght size.
        * @param {number} size The number of digits to get from the
        *   milliseconds.
        * @param {date} dt The date to get the milliseconds from.
        * @returns {string} The milliseconds as a string.
        */
        function msFetch(size, dt) {
            var ms = String(dt.getMilliseconds());
            ms = zeroPad(3, ms);
            return ms.substr(0, size);
        }

        /**
        * Fetches the timezone value.
        * @param {string} type The return form identifier. Can be "z" for the
        *   single digit hour, "zz" for the double digit hour or "zzz" for the
        *   hours and minutes.
        * @param {date} dt The date to get the timezone offset for.
        */
        function tzFetch(type, dt) {
            var tzo = dt.getTimezoneOffset() * -1,
                h = Math.floor(tzo / 60),
                m = tzo % 60;
            /* istanbul ignore else */
            if (type === 'z') {
                return String(h);
            } else if (type === 'zz') {
                return zeroPad(2, String(h));
            } else if (type === 'zzz') {
                return zeroPad(2, String(h)) + ':' + zeroPad(2, String(m));
            }
        }

        /**
        * Adds zeros to the front of the string.
        * @param {number} len The desired total length of the string.
        * @param {string} val The string to pad with zeros.
        * @returns val zero padded if it was less than len.
        */
        function zeroPad(len, val) {
            var neg = val[0] === '-';
            if (neg) {
                val = val.substr(1);
            }
            while (val.length < len) {
                val = '0' + val;
            }
            if (neg) {
                val = '-' + val;
            }
            return val;
        }
    }
}(module, global.Intl));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],8:[function(require,module,exports){
(function (global){
/**
* Offers some basic string formatting.
* @param {object} module The module to export the function onto.
*/
(function formatModule(module) {
    'use strict';
    // Constants
    var REGEX_PLACEHOLDER = new RegExp('{\\s*(\\d+)\\s*(?:,\\s*' +
        '(-?\\d+))?(?:\\s*:\\s*(.*?))?\\s*}', 'g'),
        REGEX_DOUBLES = /(?:({){|(})})/g,
        REGEX_JSON = /^json(\d*)$/i,
    // Dependencies
        typeOf = require('./typeof.js'),
        formatters = {},
        oformat;

    // Expose the format function
    module.exports = format;

    // Attach the ancillary functions
    module.exports.locale = localeFormat;
    module.exports.register = register;
    module.exports.deregister = deregister;
    module.exports.formattersAdd = formattersAdd;
    module.exports.formattersRemove = formattersRemove;
    module.exports.formattersList = formattersList;

    // Add the built in formatters
    formattersAdd('number', require('./format.number.js'));
    formattersAdd('date', require('./format.date.js'));

    /**
    * Formats a string with positional arguments. See localeFormat for details.
    */
    function format() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(undefined);
        return localeFormat.apply(null, args);
    }

    /**
    * Formats a string with positional arguments. The positional arguments come
    *   after the string argument.
    * @param {object} locale Optional object containing a single property
    *   "locale" to pass to the system locale functions in order to localize
    *   the formatted values.
    * @param {string} str The string to format.
    */
    function localeFormat(locale, str) {
        var args = Array.prototype.slice.call(arguments, 2);
        str = str.replace(REGEX_PLACEHOLDER, processPlaceholder);

        // Replace any escaped placdeholders
        str = str.replace(REGEX_DOUBLES, '$1$2');

        return str;

        /**
        * Processes the placeholder that was found in the string
        * @param {string} match The total match found
        * @param {number} idx The placeholder idx
        * @param {number} aln The alignment value.
        * @param {string} fmt The format string.
        * @param {number} offset The position in the string the match
        *   occured at.
        * @returns The replacement string.
        */
        function processPlaceholder(match, idx, aln, fmt, offset) {
            var val, odd = false, pos = offset - 1;
            while (str[pos] === '{') {
                odd = !odd;
                pos--;
            }
            if (odd) {
                return match;
            }
            idx = parseInt(idx, 10);
            aln = parseInt(aln, 10);
            val = args[idx];
            if (val === undefined) {
                val = '';
            }
            val = formatValue(val, fmt, locale);
            if (!isNaN(aln)) {
                val = align(aln, val);
            }
            return val;
        }
    }

    /**
    * Used as the function to bind to string.prototype the pass off to the
    *  format function.
    */
    function boundFormat() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(this); // jshint ignore:line
        return format.apply(null, args);
    }

    /**
    * Attaches the format function to String.prototype so it can be more easily
    *   utilised.
    */
    function register() {
        if (String.prototype.format !== boundFormat) {
            oformat = String.prototype.format;
            String.prototype.format = boundFormat;
        }
    }

    /**
    * Removes the format property from String.prototype and restores the value
    *   defined when the format function was attached by the register function.
    */
    function deregister() {
        if (String.prototype.format === boundFormat) {
            String.prototype.format = oformat;
            oformat = undefined;
        }
    }

    /**
    * Adds a formatter to the formatters collection.
    * @param {string} type The type the formatter is designed to handle.
    * @param {function} handler The function used to handle the formatting.
    */
    function formattersAdd(type, handler) {
        if (typeof handler === 'function') {
            formatters[type] = handler;
        } else {
            throw new Error('supplied handler MUST be a function');
        }
    }

    /**
    * Removes a formatter from the formatters collection.
    * @param {string} type The type the formatter is assigned to.
    * @returns {function} The removed formatter.
    */
    function formattersRemove(type) {
        var res = formatters[type];
        delete formatters[type];
        return res;
    }

    /** Returns an array of objects containing name and formatter properties */
    function formattersList() {
        return Object.keys(formatters)
            .map(fmtObj);

        /**
        * Returns an object containing a name and formatter pair.
        * @param {string} name The name of the formatter.
        * @returns {object} An object containing the formatter name and handler
        *   function.
        */
        function fmtObj(name) {
            return {
                name: name,
                formatter: formatters[name]
            };
        }
    }

    /**
    * Pads a string by the number of characters specified in the direction
    *   defined by whether the specified number if negative (left aligned)
    *   or positive (right aligned)
    * @param {number} len The minimum length of the string.
    * @param {string} text The text to align
    */
    function align(len, text) {
        var direc = len < 0 ?
            true :
            false;
        len = Math.abs(len);
        if (text.length < len) {
            len = len - text.length + 1;
            text = [text];
            while (text.length < len) {
                if (direc) {
                    text.unshift(' ');
                } else {
                    text.push(' ');
                }
            }
            text = text.join('');
        }
        return text;
    }

    /**
    * Formats the given value with the supplied format string.
    * @param value The value to format.
    * @param fmt The format value.
    * @param locale The locale to use when printing the value
    * @returns The formatted value
    */
    function formatValue(value, fmt, locale) {
        var fmtr, vt = typeOf(value);

        // Handle special js types (and empty)
        switch (fmt) {
            case '%i':
            case '%d':
                value = parseInt(value, 10);
                return String(value);
            case '%f':
                value = parseFloat(value);
                return String(value);
            case '%o':
            case '%O':
                return formatJson(value, 4);
            case '%s':
            case '':
                return String(value);
            default:
                break;
        }

        // Json applies to all types (As do the above)
        if (REGEX_JSON.test(fmt)) {
            return formatJson(value, fmt);
        }

        // Check for custom formatters to handle the type
        for (fmtr in formatters) {
            if (formatters.hasOwnProperty(fmtr)) {
                if (fmtr === vt) {
                    return formatters[fmtr](value, fmt, locale);
                }
            }
        }

        // Default to string
        return String(value);
    }

    /**
    * Converts avalue into its json format
    * @param value The object to format.
    * @param {number} tsize The tab size to pass to JSON.stringify
    */
    function formatJson(value, tsize) {
        var match;
        if (typeof tsize === 'string') {
            match = REGEX_JSON.exec(tsize);
            if (match && match[1]) {
                tsize = parseInt(match[1], 10);
            } else {
                throw new Error('Invalid format string received "' +
                    tsize + '"');
            }
        }

        if (typeof tsize === 'string' || isNaN(tsize)) {
            tsize = undefined;
        }
        return JSON.stringify(value, undefined, tsize);
    }
}(module, global.console));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./format.date.js":7,"./format.number.js":9,"./typeof.js":12}],9:[function(require,module,exports){
(function (global){
/**
* Holds the number formatting code for the format module.
* @param {object} module The module to attach exports to.
* @param {object} console The logging console to report development warnings.
* @param {object} Intl The internationalization global.
*/
(function formatNumberModule(module, console, Intl) {
    'use strict';

    // Constants
    var REGEX_NUMBER_CURRENCY = new RegExp('^c(\\d*)(?:\\:([a-z]{3}))' +
        '(?:\\:(symbol|code|name))?$', 'i'),
        REGEX_NUMBER_PRECISION = /^([a-z])(\d*)$/i,
        CUSTOM_FORMAT_SECTIONS = ['positive', 'negative', 'zero'];

    // Public API
    module.exports = formatNumber;

    /**
    * Formats the given number according to the supplied format string.
    * Formating closely follows .NET string formatting as seen at
    *   Standard formatting
    *       https://msdn.microsoft.com/en-us/library/dwhawy9k(v=vs.110).aspx
    *   Custom formatting
    *       https://msdn.microsoft.com/en-us/library/0c899ak8(v=vs.110).aspx
    * The following major differences exist
    *   * Currency "c" requires a currency code to be specified in addition
    *       to any locale, and may also take an additional parameter determining
    *       how to display the currency.
    *       c<decimal places>:<3 digit currency code>[:<symbol|code|name>]
    * @param {number} num The number to format
    * @param {string} fmt The format string that determines how to display the
    *   value.
    * @param {string} locale The locale to use when formatting the number
    *   output.
    */
    function formatNumber(num, fmt, locale) {
        var match, precision;
        match = /^c(\d*)(\:[a-z]{3})?(\:(?:symbol|code|name))?$/i;
        /*jshint -W084 */
        if (match = REGEX_NUMBER_CURRENCY.exec(fmt)) {
            precision = parseInt(match[1], 10);
            return formatCurrency(precision, match[2], match[3]);
        } else if (match = REGEX_NUMBER_PRECISION.exec(fmt)) {
            /*jshint +W084 */
            precision = parseInt(match[2], 10);
            switch (match[1].toLowerCase()) {
                case 'd':
                    return formatDecimal(precision);
                case 'e':
                    return formatScientific(precision);
                case 'f':
                    return formatFixedPoint(precision);
                case 'g':
                    return formatGeneral(precision);
                case 'n':
                    return formatNumeric(precision);
                case 'p':
                    return formatPercent(precision);
                case 'x':
                    return formatHex(match[1], precision);
                default:
                    return formatCustom();
            }
        } else {
            return formatCustom();
        }

        /**
        * Performs a currency format of the value. The following currency forms
        *   are accepted.
        * C[<Decimal digits>][:<Currency code>][:<symbol|code|name>]
        * @param {number} precision The number of decimal places.
        * @param {string} code The currency code.
        * @param {string} display The display method to use for the currency.
        *   Can be symbol, code or name.
        */
        function formatCurrency(precision, code, display) {
            var opts;
            if (isNaN(precision)) {
                precision = 2;
            }
            opts = {
                style: 'currency',
                currency: code,
                minimumFractionDigits: precision,
                maximumFractionDigits: precision,
                useGrouping: false
            };
            if (display) {
                opts.currencyDisplay = display;
            }
            return numFormat(num, opts);
        }

        /**
        * Performs decimal formatting.
        * @param {number} precision The shortest length of the
        *   number (0 padded).
        */
        function formatDecimal(precision) {
            var val = String(Math.floor(num)),
                len;
            if (!isNaN(precision)) {
                len = precision;
                val = zeroPad(len, val);
            }
            return val;
        }

        /**
        * Formats the value in scientific notation.
        * @param {number} precision The number of decimal places.
        */
        function formatScientific(precision) {
            var res;
            if (isNaN(precision)) {
                res = num.toExponential();
            } else {
                res = num.toExponential(precision);
            }
            res = localizeNum(res);
            return res;
        }

        /**
        * Formats the number in fixed point.
        * @param {number} precision The number of decimal places.
        */
        function formatFixedPoint(precision) {
            if (isNaN(precision)) {
                precision = 2;
            }
            return numFormat(num, {
                minimumFractionDigits: precision,
                maximumFractionDigits: precision,
                useGrouping: false
            });
        }

        /**
        * The most compact of fixed point or scientific.
        * @param {number} precision The number of decimal places.
        */
        function formatGeneral(precision) {
            var fp, sn;
            fp = formatFixedPoint(precision);
            sn = formatScientific(precision);
            if (sn.length < fp.length) {
                return sn;
            } else {
                return fp;
            }
        }

        /**
        * Performs numeric formatting
        * @param {number} precision The number of decimal places.
        */
        function formatNumeric(precision) {
            if (isNaN(precision)) {
                precision = 2;
            }
            return numFormat(num, {
                minimumFractionDigits: precision,
                maximumFractionDigits: precision,
                useGrouping: true
            });
        }

        /**
        * Formats the number as a percentage value.
        * @param {number} precision The number of decimal places.
        */
        function formatPercent(precision) {
            if (isNaN(precision)) {
                precision = 2;
            }
            return numFormat(num, {
                style: 'percent',
                minimumFractionDigits: precision,
                maximumFractionDigits: precision,
                useGrouping: true
            });
        }

        /**
        * Formats the number as a hexidecimal value.
        * @param {string} command The command (x or X).
        * @param {number} precision The shortest length of the resulting string.
        */
        function formatHex(command, precision) {
            var val = num.toString(16);
            if (!isNaN(precision)) {
                val = zeroPad(precision, val);
            }
            if (command === 'x') {
                val = val.toLowerCase();
            } else { // If command === 'X'
                val = val.toUpperCase();
            }
            return val;
        }

        /**
        * Ensures the supplied number is correct for the specified locale.
        * @param {number} num The number to localize.
        * @returns {string} The localized number.
        */
        function localizeNum(num) {
            var dseps, seps;
            num = String(num);
            if (locale) {
                dseps = separators();
                seps = separators(locale);
                if (dseps.decimal !== seps.decimal) {
                    num = num.replace(/[,.]/g, swap);
                }
            }
            return num;

            /**
            * Swaps comma for dot and vica versa.
            * @param {string} val The value to swap.
            */
            function swap(val) {
                return val === '.' ?
                    ',' :
                    '.';
            }
        }

        /** Performs custom processing on the number */
        function formatCustom() {
            var tokens, data, seps, res;

            // Get the separators for localization.
            seps = separators(locale);

            // Tokenize the format string
            tokens = tokenize();

            // Generate the data used to process from the tokens
            data = generateFormatData(tokens);

            // Process the format data to generate the output.
            res = processData(data);

            return res;

            /**
            * Processes the given format data with the supplied number.
            * @param {object} data The format data as generated by
            *   generateFormatData.
            */
            function processData(data) {
                var int, intNum, frac, fracNum, dpos, neg;

                // Apply adjustments
                neg = num < 0;
                num = Math.abs(num);

                if (num === 0) {
                    num = num * data.zero.multiplier / data.zero.divisor;
                } else if (neg) {
                    num = num * data.negative.multiplier /
                        data.negative.divisor;
                } else {
                    num = num * data.positive.multiplier /
                        data.positive.divisor;
                }

                fracNum = Math.abs(num) - Math.floor(Math.abs(num));
                intNum = num - fracNum;
                int = String(intNum);

                if (num === 0) {
                    int = processIntPart(data.zero);
                    frac = processFracPart(data.zero);
                } else if (neg) {
                    int = processIntPart(data.negative);
                    frac = processFracPart(data.negative);
                } else {
                    int = processIntPart(data.positive);
                    frac = processFracPart(data.positive);
                }

                if (frac === false) {
                    // This means we have rounded to zero, and need to change
                    //  format
                    return processData(data);
                } else if (frac) {
                    return int + seps.decimal + frac;
                } else {
                    return int;
                }

                /**
                * Processes the integral part of the data.
                * @param {object} fmt The format object.
                */
                function processIntPart(fmt) {
                    var i, cnt;

                    // First try to normalize and balance the format
                    //  and number
                    cnt = normalizePlaceholders();

                    // If we need to group, add the group separators into
                    //  the format as literals.
                    if (fmt.group) {
                        addGroupLiterals(cnt);
                    }

                    // If we have a negative number, add it at the start of the
                    //  integral part as a literal.
                    if (neg && cnt) {
                        fmt.integral.unshift({
                            type: 'literal',
                            value: '-'
                        });
                    }

                    // Go through and replace the placeholders.
                    dpos = 0;
                    for (i = 0; i < fmt.integral.length; i++) {
                        if (fmt.integral[i].type === 'placeholder') {
                            fmt.integral[i].type = 'literal';
                            fmt.integral[i].value = int[dpos];
                            dpos++;
                        /* istanbul ignore if */
                        } else if (fmt.integral[i].type !== 'literal') {
                            // If this happens it is a dev error.
                            throw new Error('Should not have tokens of type "' +
                                fmt.integral[i].type + '"' + ' at this point!');
                        }
                    }
                    return fmt.integral.map(value).join('');

                    /**
                    * Adds comma litrals to the format parts.
                    * @param {number} phcnt The total number of placeholders.
                    */
                    function addGroupLiterals(phcnt) {
                        var pos = 0, i;
                        for (i = fmt.integral.length - 1; i >= 0; i--) {
                            if (fmt.integral[i].type === 'placeholder') {
                                pos++;
                                if (pos < phcnt && pos > 0 && pos % 3 === 0) {
                                    fmt.integral.splice(i, 0, {
                                        type: 'literal',
                                        value: seps.separator
                                    });
                                }
                            }
                        }
                    }

                    /**
                    * Replaces "#" appearing after "0" with "0", and ensures the
                    *   placeholder count matches the int digit count.
                    */
                    function normalizePlaceholders() {
                        var i, integ, has0, cnt, first;
                        cnt = 0;
                        for (i = 0; i < fmt.integral.length; i++) {
                            integ = fmt.integral[i];
                            if (integ.type === 'placeholder') {
                                cnt++;
                                if (first === undefined) {
                                    first = i;
                                }
                                if (integ.value === '0') {
                                    has0 = true;
                                } else if (integ.value === '#' && has0) {
                                    integ.value = '0';
                                }
                            }
                        }
                        if (first === undefined) {
                            first = 0;
                        }

                        // Add additional place holders with the first
                        //  until we have the same number of placeholders
                        //  as digits
                        while (cnt > 0 && cnt < int.length) {
                            fmt.integral.splice(first, 0, {
                                type: 'placeholder',
                                value: '#'
                            });
                            cnt++;
                        }

                        // We assume we have a first which points to a
                        //  placeholder (since cnt MUST be bigger than 0)
                        while (int.length < cnt) {
                            if (fmt.integral[first].value === '#') {
                                fmt.integral.splice(first, 1);
                                first = findFirstPlaceholder();
                                cnt--;
                            } else {
                                int = '0' + int;
                            }
                        }

                        return cnt;

                        /** Find the first placeholder */
                        function findFirstPlaceholder() {
                            var i;
                            for (i = 0; i < fmt.integral.length; i++) {
                                if (fmt.integral[i].type === 'placeholder') {
                                    return i;
                                }
                            }
                            return -1;
                        }
                    }
                }

                /**
                * Processes the fraction part
                * @param {object} fmt The format object.
                */
                function processFracPart(fmt) {
                    var mult, was0, frac, pholders, idx, flag;
                    if (!fmt.fraction.length) {
                        return '';
                    }
                    pholders = fmt.fraction.filter(isPlaceholder);
                    mult = Math.pow(10, pholders.length);
                    was0 = fracNum === 0;
                    fracNum = fracNum * mult;
                    fracNum = Math.round(fracNum);
                    if (!was0 && fracNum === 0 && intNum === 0) {
                        return false;
                    }
                    frac = String(fracNum);

                    // Ensure everything is in order.
                    normalizePlaceholders();

                    // Since we made the fraction an integer, we may have lost
                    //  significant 0s... put them back.
                    frac = zeroPad(pholders.length, frac);

                    // Remove any zeros from the end of frac, as well as #
                    //  placeholders that are not required (will not result in
                    //  any value being printed).
                    frac = frac.split('');
                    flag = true;
                    while (frac.length) {
                        if (flag && frac[frac.length - 1] === '0' &&
                            pholders[pholders.length - 1].value === '#') {
                            idx = fmt.fraction.indexOf(
                                pholders[pholders.length - 1]
                            );
                            fmt.fraction.splice(idx, 1);
                        } else {
                            flag = false;
                            pholders[pholders.length - 1].type = 'literal';
                            pholders[pholders.length - 1].value =
                                frac[frac.length - 1];
                        }
                        frac.pop();
                        pholders.pop();
                    }
                    return fmt.fraction.map(value).join('');

                    /** Ensures that all placeholders before the last 0 are 0 */
                    function normalizePlaceholders() {
                        var i, found;
                        for (i = fmt.fraction.length - 1; i >= 0; i--) {
                            if (fmt.fraction[i].type === 'placeholder') {
                                if (found) {
                                    fmt.fraction[i].value = '0';
                                } else if (fmt.fraction[i].value === '0') {
                                    found = true;
                                }
                            }
                        }
                    }
                }

                /**
                * Returns the value part of the supplied token.
                * @param {object} token The token to retrieve the value from.
                * @returns The token value.
                */
                function value(token) {
                    return token.value;
                }

                /**
                * Returns true if this is a placeholder.
                * @param {object} token The token to check.
                */
                function isPlaceholder(token) {
                    return token.type === 'placeholder';
                }
            }

            /**
            * Generates the format data from the supplied tokens.
            * @param {array} tokens The tokens to be used to generate the format
            *   data.
            */
            function generateFormatData(tokens) {
                var i, sec, res, skip, pattern, curr;
                curr = 'positive';
                res = {
                    positive: createSection()
                };
                sec = 0;
                pattern = res[curr].integral;
                for (i = 0; i < tokens.length; i++) {
                    if (skip) {
                        skip = false;
                        continue;
                    }
                    switch (tokens[i].type) {
                        case 'section':
                            sec++;
                            if (sec > 2) {
                                // Stop processing.
                                break;
                            }
                            if (tokens[i + 1] &&
                                tokens[i + 1].type === 'section') {
                                // We leave the section out if it is empty.
                                continue;
                            } else {
                                curr = CUSTOM_FORMAT_SECTIONS[sec];
                                res[curr] = createSection();
                                pattern = res[curr].integral;
                            }
                            break;
                        case 'skip':
                            skip = true;
                            // Add next as literal...
                            if (tokens[i + 1]) {
                                pattern.push({
                                    type: 'literal',
                                    value: tokens[i + 1].value
                                });
                            }
                            break;
                        case 'literal':
                            pattern.push(tokens[i]);
                            break;
                        case 'placeholder':
                            pattern.push(tokens[i]);
                            break;
                        case 'decimal':
                            pattern = res[curr].fraction;
                            break;
                        case 'divisor':
                            if (res[curr].divisor === 0) {
                                res[curr].divisor =
                                    Math.pow(10, tokens[i].value.length);
                            }
                            break;
                        case 'group':
                            res[curr].group = true;
                            break;
                        case 'adjust':
                            /* istanbul ignore else */
                            if (tokens[i].value === '%') {
                                if (res[curr].multiplier === 0) {
                                    res[curr].multiplier = 100;
                                }
                            } else if (tokens[i].value === '‰') {
                                if (res[curr].multiplier === 0) {
                                    res[curr].multiplier = 1000;
                                }
                            } else {
                                throw new Error('Unrecognized adjustment ' +
                                    'value "' + tokens[i].type + '"');
                            }
                            pattern.push({
                                type: 'literal',
                                value: tokens[i].value
                            });
                            break;
                    }
                }

                if (!res.negative) {
                    res.negative = res.positive;
                }
                if (!res.zero) {
                    res.zero = res.positive;
                }

                postProcess('positive');
                postProcess('negative');
                postProcess('zero');
                return res;

                /**
                * Flattens literals, and ensures valid divisor and multiplier
                *   values.
                * @param {string} curr The current section being processed.
                */
                function postProcess(curr) {
                    var i;
                    if (res[curr].divisor === 0) {
                        res[curr].divisor = 1;
                    }
                    if (res[curr].multiplier === 0) {
                        res[curr].multiplier = 1;
                    }
                    for (i = 1; i < res[curr].integral.length; i++) {
                        if (res[curr].integral[i].type === 'literal' &&
                            res[curr].integral[i - 1].type === 'literal') {
                            // Combine the 2 literals
                            res[curr].integral[i - 1].value +=
                                res[curr].integral[i].value;
                            res[curr].integral.splice(i, 1);
                            i--;
                        }
                    }
                    for (i = 1; i < res[curr].fraction.length; i++) {
                        if (res[curr].fraction[i].type === 'literal' &&
                            res[curr].fraction[i - 1].type === 'literal') {
                            // Combine the 2 literals
                            res[curr].fraction[i - 1].value +=
                                res[curr].fraction[i].value;
                            res[curr].fraction.splice(i, 1);
                            i--;
                        }
                    }
                }

                /** Creates a new section */
                function createSection() {
                    return {
                        group: false,
                        divisor: 0,
                        multiplier: 0,
                        integral: [],
                        fraction: []
                    };
                }
            }

            /**
            * Tokenizes the custom format string to make it easier to work with.
            */
            function tokenize() {
                var i, res, char, divisor, divisorStop, lit, litStop, prev,
                    token;

                res = [];
                divisor = '';
                lit = '';
                for (i = 0; i < fmt.length; i++) {
                    token = undefined;
                    divisorStop = true;
                    litStop = true;
                    char = fmt.charAt(i);
                    switch (char) {
                        case '\\':
                            token = {
                                type: 'skip',
                                value: '\\'
                            };
                            break;
                        case '0':
                            token = {
                                type: 'placeholder',
                                value: '0'
                            };
                            break;
                        case '#':
                            token = {
                                type: 'placeholder',
                                value: '#'
                            };
                            break;
                        case '.':
                            token = {
                                type: 'decimal',
                                value: '.'
                            };
                            break;
                        case ',':
                            divisor += ',';
                            divisorStop = false;
                            break;
                        case '%':
                            token = {
                                type: 'adjust',
                                value: '%'
                            };
                            break;
                        case '‰':
                            token = {
                                type: 'adjust',
                                value: '‰'
                            };
                            break;
                        case ';':
                            token = {
                                type: 'section'
                            };
                            break;
                        default:
                            lit += char;
                            litStop = false;
                            break;
                    }

                    if (divisorStop && divisor) {
                        endDivisor(token);
                    }
                    if (lit && litStop) {
                        endLit();
                    }
                    if (token) {
                        res.push(token);
                    }
                    prev = char;
                }

                if (divisor) {
                    endDivisor();
                }

                if (lit) {
                    endLit();
                }

                return res;

                /**
                * Ends the divisor capture which may result in a divisor,
                *   or a group
                * @param {object} token The token to check.
                */
                function endDivisor(token) {
                    if (!token || token.type === 'decimal') {
                        res.push({
                            type: 'divisor',
                            value: divisor
                        });
                    } else {
                        res.push({
                            type: 'group',
                            value: ','
                        });
                    }
                    divisor = '';
                }

                /** Ends a literal capture */
                function endLit() {
                    res.push({
                        type: 'literal',
                        value: lit
                    });
                    lit = '';
                }
            }
        }

        /**
        * Performs locale senstive number conversions
        * @param {number} num The number to format.
        * @param {object} options The options to pass to the formatter.
        */
        function numFormat(num, options) {
            return new Intl.NumberFormat(locale, options).format(num);
        }

        /**
        * Zero pads the supplied value until it is the specified length.
        * @param {number} len The desired final length of the string.
        * @param {string} val The value to attempt to pad.
        * @returns The padded value.
        */
        function zeroPad(len, val) {
            var pfx = '';
            if (val[0] === '-') {
                pfx = '-';
                val = val.substr(1);
            }
            while (val.length < len) {
                val = '0' + val;
            }
            return pfx + val;
        }

        /**
        * Returns the decimal and grouping info for the locale.
        * @param {string} locale Optional locale to check. If not supplied,
        *   the default locale is used.
        */
        function separators(locale) {
            var str, cidx, didx, dec, grp;
            str = 1111111.111;
            str = str.toLocaleString(locale);
            cidx = str.indexOf(',');
            didx = str.indexOf('.');
            if (didx < cidx) {
                dec = ',';
                grp = '.';
            } else {
                dec = '.';
                grp = ',';
            }
            return {
                decimal: dec,
                separator: grp
            };
        }
    }
}(module, global.console, global.Intl));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],10:[function(require,module,exports){
/**
* References all functionality in the package and attaches it to the exports
* @param {object} exports The object to export the public API onto.
*/
(function indexModule(exports) {
    /* globals window */
    'use strict';
    exports.clone = require('./clone.js');
    exports.copy = require('./copy.js');
    exports.Promise = require('./epromise.js');
    exports.extend = require('./extend.js');
    exports.typeOf = require('./typeof.js');
    exports.format = require('./format.js');
    exports.regex = require('./regex.js');
    exports.EventEmitter = require('../lib/events.js');

    exports.register = register;
    exports.safeRegister = safeRegister;
    exports.deregister = deregister;

    // If we are in a browser, attach to window
    if (typeof window === 'object') {
        window.stdlib = {
            clone: exports.clone,
            copy: exports.copy,
            Promise: exports.Promise,
            extend: exports.extend,
            typeOf: exports.typeOf,
            format: exports.format,
            regex: exports.regex,
            EventEmitter: exports.EventEmitter,
            register: exports.register,
            safeRegister: exports.safeRegister,
            deregister: exports.deregister
        };
    }

    /**
    * Calles register on exposed modules which support it, and are considered
    *   safe prototype changes (ie. string)
    */
    function safeRegister() {
        exports.format.register();
        exports.regex.register();
    }

    /** Calles register on all exposed modules which support it. */
    function register() {
        safeRegister();
        exports.clone.register();
        exports.copy.register();
        exports.extend.register();
        exports.typeOf.register();
    }

    /** Calls deregister on all exposed modules which support it. */
    function deregister() {
        exports.format.deregister();
        exports.regex.deregister();
    }
}(module.exports));

},{"../lib/events.js":1,"./clone.js":3,"./copy.js":4,"./epromise.js":5,"./extend.js":6,"./format.js":8,"./regex.js":11,"./typeof.js":12}],11:[function(require,module,exports){
/**
* Helper functions for working with regex/
* @param {object} exports The object to export the public API onto.
*/
(function regexpModule(exports) {
    'use strict';
    var oencode, odecode;

    // Expose the public API
    exports.encode = rexpEncode;
    exports.decode = rexpDecode;
    exports.register = register;
    exports.deregister = deregister;

    /**
    * Encodes a string so it can appear literally inside of a regular expression
    * @param {string} str The string to escase.
    */
    function rexpEncode(str) {
        return str.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    /**
    * Decodes a string previously encoded by rexpEncode.
    * @param {string} str The string to unescase.
    */
    function rexpDecode(str) {
        return str.replace(/\\([-\\^$*+?.()|[\]{}])/g, '$1');
    }

    /**
    * Adds the escaping functions from the regexp constructor, and saves
    *   references to the originals for restoration on deregister.
    */
    function register() {
        if (RegExp.encode !== rexpEncode) {
            oencode = RegExp.encode;
            odecode = RegExp.decode;
            RegExp.encode = rexpEncode;
            RegExp.decode = rexpDecode;
        }
    }

    /**
    * Removes the escaping functions from the regexp constructor, and restores
    *   the originals.
    */
    function deregister() {
        if (RegExp.encode === rexpEncode) {
            RegExp.encode = oencode;
            RegExp.decode = odecode;
            oencode = undefined;
            odecode = undefined;
        }
    }
}(module.exports));

},{}],12:[function(require,module,exports){
/**
* Defines the typeOf function which is an enhancement of the typeof operator.
* @param {object} module The module to export the public API to.
*/
(function typeOfModule(module) {
    'use strict';
    var handlers = [],
        otypeof;

    // Expose the function
    module.exports = typeOf;
    module.exports.handlersAdd = handlersAdd;
    module.exports.handlersRemove = handlersRemove;
    module.exports.handlersList = handlersList;
    module.exports.handlersClear = handlersClear;
    module.exports.register = register;
    module.exports.deregister = deregister;

    /**
    * A slightly enhanced typeOf.
    * @param val The value to determine the type of.
    * @returns {string} A string containing one of the following values
    *   depending on the supplied value.
    *       * 'regexp' - The value is a RegExp
    *       * 'date' - The value is a Date
    *       * 'null' - The value is null
    *       * 'array' - The value is an array
    *       * 'object' - The value is an object that is not one of the previous
    *           values.
    *       * 'nan' - The value is a number that is NaN.
    *       * 'number' - The value is a number that is not NaN (If that makes
    *           any sense).
    *       * 'undefined' - The value is undefined
    *       * 'function' - The value is a function
    *       * 'boolean' - The value is true or false
    *       * 'string' - The value is a string.
    */
    function typeOf(val) {
        var i, hres, vt;
        // Let custom handlers process first
        for (i = 0; i < handlers.length; i++) {
            hres = handlers[i](val);
            if (typeof hres === 'string') {
                return hres;
            }
        }
        vt = typeof val;
        switch (vt) {
            case 'object':
                if (Array.isArray(val)) {
                    return 'array';
                } else if (val instanceof RegExp) {
                    return 'regexp';
                } else if (val instanceof Date) {
                    return 'date';
                } else if (val) {
                    return vt;
                } else {
                    return 'null';
                }
                /* istanbul ignore next */
                break;
            case 'number':
                if (isNaN(val)) {
                    return 'nan';
                } else {
                    return vt;
                }
                /* istanbul ignore next */
                break;
            case 'undefined':
            case 'function':
            case 'boolean':
            case 'string':
                return vt;
            /* istanbul ignore next */
            default:
                throw new Error(
                    'Unrecognized typeof return value "' + vt + '"!', vt
                );
        }
    }

    /**
    * Adds a custom typeOf handler.
    * @param {function} handler The handler function to add.
    */
    function handlersAdd(handler) {
        if (typeof handler === 'function') {
            handlers.push(handler);
        }
    }

    /**
    * Removes a handler from the collection and returns it
    * @param {function} handler The handler function to remove.
    */
    function handlersRemove(handler) {
        var idx;
        idx = handlers.indexOf(handler);
        if (idx > -1) {
            return handlers.splice(idx, 1)[0];
        }
    }

    /** Returns an array of handlers */
    function handlersList() {
        return handlers.slice();
    }

    /** Removes all custom handlers */
    function handlersClear() {
        handlers.length = 0;
    }

    /** Used to bind typeOf to Object.prototype */
    function boundTypeOf() {
        var val = this.valueOf(); // jshint ignore:line
        return typeOf(val);
    }

    /** Adds typeof to Object.prototype */
    function register() {
        if (Object.prototype.typeOf !== boundTypeOf) {
            otypeof = Object.prototype.typeOf;
            Object.prototype.typeOf = boundTypeOf;
        }
    }

    /** Removes typeof from object.prototype */
    function deregister() {
        if (Object.prototype.typeOf === boundTypeOf) {
            Object.prototype.typeOf = otypeof;
            otypeof = undefined;
        }
    }
}(module));

},{}]},{},[10]);
